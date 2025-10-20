//! Fichier principal : même source pour 2 modes
//! mode "firmware" (embarqué sur STM32)
//! mode "simulation" (exécutable sur PC), utile pour tester la logique

// Ces attributs activent no_std / no_main uniquement quand la feature "firmware" est présente.
// "no_std" : on n'utilise pas la lib standard (pas de heap/OS sur MCU).
// "no_main" : le point d’entrée sera fourni par cortex-m-rt via #[entry].
#![cfg_attr(feature = "firmware", no_std)]
#![cfg_attr(feature = "firmware", no_main)]

// Module capteur (conversion des mesures brutes du HDC1080)
mod sensor;
use sensor::hdc1080_convert;

// En mode firmware, on préfère "panic_halt" : en cas de panic, la CPU s'arrête (boucle infinie)
#[cfg(feature = "firmware")]
use panic_halt as _;
// Fournit l’attribut #[entry] (point d’entrée) et la table d’interruptions
#[cfg(feature = "firmware")]
use cortex_m_rt::entry;

// Tout ce qui suit dans mod fw ne sera compilé que pour l’embarqué
#[cfg(feature = "firmware")]
mod fw {
    use super::*;
    use core::fmt::Write; // pour write_str / formatage vers l’UART
    use cortex_m::Peripherals; // accès aux périphériques coeur (SysTick, NVIC…)
    use stm32f1xx_hal::{
        pac,              // accès bas niveau (registres) généré depuis SVD
        prelude::*,       // extensions utiles (MHz(), hz(), .freeze(), etc.)
        delay::Delay,     // temporisations bloquantes basées sur SysTick
        i2c::{BlockingI2c, DutyCycle, Mode}, // I2C en mode bloquant
        serial::{Config, Serial},            // UART/USART
    };

    // Adresse I2C 7 bits du HDC1080
    const HDC1080_ADDR: u8 = 0x40;

    // Point d’entrée du firmware (remplace fn main classique)
    #[entry]
    fn main() -> ! {
        // Périphériques coeur (SysTick, etc.)
        let cp = Peripherals::take().unwrap();
        // Périphériques STM32 (GPIO, RCC, I2C, USART, …)
        let dp = pac::Peripherals::take().unwrap();

        // --- Configuration des horloges ---
        // On verrouille FLASH et RCC pour utiliser les méthodes "safe" du HAL
        let mut flash = dp.FLASH.constrain();
        let mut rcc = dp.RCC.constrain();

        // HSE = quartz externe 8 MHz, on règle:
        //  - sysclk à 72 MHz (fréquence CPU)
        //  - pclk1 à 36 MHz (bus APB1)
        // .freeze() applique la configuration et retourne un objet "clocks"
        let clocks = rcc
            .cfgr
            .use_hse(8.MHz())
            .sysclk(72.MHz())
            .pclk1(36.MHz())
            .freeze(&mut flash.acr);

        // --- Initialisation des délais bloquants (ms, µs) ---
        // Delay basé sur le SysTick et l’arbre d’horloges configuré ci-dessus
        let mut delay = Delay::new(cp.SYST, clocks);

        // --- Initialisation GPIO et AFIO ---
        // AFIO gère le remap des fonctions alternatives
        let mut afio = dp.AFIO.constrain(&mut rcc.apb2);
        // On sépare (split) les banques GPIO pour obtenir des "handles" sûrs
        let mut gpioa = dp.GPIOA.split(&mut rcc.apb2);
        let mut gpiob = dp.GPIOB.split(&mut rcc.apb2);

        // --- UART (USART1 sur PA9/PA10, 115200 8N1) ---
        // PA9 en sortie alternate push-pull pour TX, PA10 en entrée (RX)
        let tx = gpioa.pa9.into_alternate_push_pull(&mut gpioa.crh);
        let rx = gpioa.pa10;

        // Création de l’USART1 avec la config 115200 bps
        // serial implémente core::fmt::Write → pratique pour writeln!/write_str
        let mut serial = Serial::usart1(
            dp.USART1,
            (tx, rx),
            &mut afio.mapr,
            Config::default().baudrate(115_200.bps()),
            clocks,
            &mut rcc.apb2,
        );

        // --- I2C1 (PB6=SCL, PB7=SDA, 400 kHz) ---
        // L’I2C nécessite des sorties open-drain + résistances de pull-up externes
        let scl = gpiob.pb6.into_alternate_open_drain(&mut gpiob.crl);
        let sda = gpiob.pb7.into_alternate_open_drain(&mut gpiob.crl);

        // BlockingI2c : API simple, les appels write/read bloquent jusqu’à fin d’opération
        // Les 4 derniers paramètres sont des timeouts/retries (cf. doc HAL)
        let mut i2c = BlockingI2c::i2c1(
            dp.I2C1,
            (scl, sda),
            &mut afio.mapr,
            Mode::Fast {
                frequency: 400_000.hz(),
                duty_cycle: DutyCycle::Ratio2to1,
            },
            clocks,
            &mut rcc.apb1,
            1000, // timeout start
            10,   // retry start
            1000, // timeout data
            1000, // timeout stop
        );

        // Petit message de démarrage sur le port série
        writeln!(serial, "Boot OK\r").ok();

        // --- Boucle principale ---
        loop {
            // 1) Demande de mesure au HDC1080 :
            // écrire 0x00 dans le registre pointeur = mesure T puis RH
            let _ = i2c.write(HDC1080_ADDR, &[0x00]);

            // 2) Attendre la conversion (~6-7 ms à 14 bits) → on prend 10 ms pour être large
            delay.delay_ms(10u16);

            // 3) Lire 4 octets (2 pour T, 2 pour RH)
            let mut buf = [0u8; 4];
            let res = i2c.read(HDC1080_ADDR, &mut buf);

            // 4) Selon le résultat I2C, formater une ligne à envoyer sur l’UART
            let line = match res {
                Ok(()) => {
                    // Conversion big-endian des mots 16 bits
                    let raw_t = u16::from_be_bytes([buf[0], buf[1]]);
                    let raw_rh = u16::from_be_bytes([buf[2], buf[3]]);
                    // Conversion en unités physiques (°C et %RH)
                    let r: Reading = hdc1080_convert(raw_t, raw_rh);
                    alloc_line(r) // construit une String heapless avec le texte formaté
                }
                Err(_) => alloc_str("I2C error\r"),
            };

            // 5) Emission de la ligne sur l’UART
            let _ = serial.write_str(&line);

            // 6) Période d’échantillonnage : 1 seconde (bloquant)
            delay.delay_ms(1000u16);
        }
    }

    // Construit une chaîne "heapless" (pas d’allocation dynamique) avec la lecture formatée
    fn alloc_line(r: Reading) -> heapless::String<64> {
        use heapless::String;
        let mut s: String<64> = String::new();
        // format_args! évite une allocation intermédiaire
        let _ = core::fmt::write(
            &mut s,
            format_args!("T={:.2}°C RH={:.2}%\r", r.temperature_c, r.humidity_rh),
        );
        s
    }

    // Construit une chaîne "heapless" à partir d’un &str constant
    fn alloc_str(msg: &str) -> heapless::String<64> {
        use heapless::String;
        let mut s: String<64> = String::new();
        let _ = s.push_str(msg);
        s
    }
}

// --- Mode "simulation" (quand la feature firmware N’EST PAS activée) ---
// Permet d’exécuter sur PC (Windows/Linux/macOS) pour tester la logique de conversion
#[cfg(not(feature = "firmware"))]
fn main() {
    use std::thread;
    use std::time::Duration;
    println!("Simulation firmware (sans carte) — Ctrl+C pour quitter");

    // Valeurs simulées qui varient dans le temps (en douceur)
    let mut t: f32 = 22.0;
    let mut rh: f32 = 45.0;

    loop {
        // On fabrique des "raw" 16 bits qui imitent le format du HDC1080
        let raw_t = (((t + 40.0) / 165.0) * 65536.0).clamp(0.0, 65535.0) as u16;
        let raw_rh = ((rh / 100.0) * 65536.0).clamp(0.0, 65535.0) as u16;

        // Réutilise la même fonction de conversion que sur cible
        let r = hdc1080_convert(raw_t, raw_rh);

        // Affichage console lisible avec timestamp
        println!(
            "[{}] T={:.2}°C RH={:.2}%",
            humantime::format_rfc3339_seconds(std::time::SystemTime::now()),
            r.temperature_c,
            r.humidity_rh
        );

        // Petite évolution des valeurs pour "simuler" l’environnement
        t += 0.05;
        if t > 27.0 {
            t = 22.0;
        }
        rh += 0.2;
        if rh > 65.0 {
            rh = 45.0;
        }

        // Période 1 seconde
        thread::sleep(Duration::from_millis(1000));
    }
}
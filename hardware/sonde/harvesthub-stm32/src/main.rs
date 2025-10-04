#![cfg_attr(feature = "firmware", no_std)]
#![cfg_attr(feature = "firmware", no_main)]

mod sensor;
use sensor::{hdc1080_convert};

#[cfg(feature = "firmware")]
use panic_halt as _;
#[cfg(feature = "firmware")]
use cortex_m_rt::entry;

#[cfg(feature = "firmware")]
mod fw {
    use super::*;
    use core::fmt::Write;
    use cortex_m::Peripherals;
    use stm32f1xx_hal::{
        pac,
        prelude::*,
        delay::Delay,
        i2c::{BlockingI2c, DutyCycle, Mode},
        serial::{Config, Serial},
    };

    const HDC1080_ADDR: u8 = 0x40;

    #[entry]
    fn main() -> ! {
        let cp = Peripherals::take().unwrap();
        let dp = pac::Peripherals::take().unwrap();

        // --- Clocks configuration ---
        let mut flash = dp.FLASH.constrain();
        let mut rcc = dp.RCC.constrain();
        let clocks = rcc
            .cfgr
            .use_hse(8.MHz())
            .sysclk(72.MHz())
            .pclk1(36.MHz())
            .freeze(&mut flash.acr);

        // --- Delay initialisation ---
        let mut delay = Delay::new(cp.SYST, clocks);

        // --- GPIO and AFIO ---
        let mut afio = dp.AFIO.constrain(&mut rcc.apb2);
        let mut gpioa = dp.GPIOA.split(&mut rcc.apb2);
        let mut gpiob = dp.GPIOB.split(&mut rcc.apb2);

        // --- UART (USART1 - PA9/PA10, 115200 8N1) ---
        let tx = gpioa.pa9.into_alternate_push_pull(&mut gpioa.crh);
        let rx = gpioa.pa10;
        let mut serial = Serial::usart1(
            dp.USART1,
            (tx, rx),
            &mut afio.mapr,
            Config::default().baudrate(115_200.bps()),
            clocks,
            &mut rcc.apb2,
        );

        // --- I2C1 (PB6 = SCL, PB7 = SDA, 400kHz) ---
        let scl = gpiob.pb6.into_alternate_open_drain(&mut gpiob.crl);
        let sda = gpiob.pb7.into_alternate_open_drain(&mut gpiob.crl);
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
            1000,
            10,
            1000,
            1000,
        );

        writeln!(serial, "Boot OK\r").ok();

        loop {
            // Asking measurement
            let _ = i2c.write(HDC1080_ADDR, &[0x00]);
            delay.delay_ms(10u16);

            // Reading 4 octets (T + RH)
            let mut buf = [0u8; 4];
            let res = i2c.read(HDC1080_ADDR, &mut buf);

            let line = match res {
                Ok(()) => {
                    let raw_t = u16::from_be_bytes([buf[0], buf[1]]);
                    let raw_rh = u16::from_be_bytes([buf[2], buf[3]]);
                    let r: Reading = hdc1080_convert(raw_t, raw_rh);
                    alloc_line(r)
                }
                Err(_) => alloc_str("I2C error\r"),
            };

            let _ = serial.write_str(&line);
            delay.delay_ms(1000u16);
        }
    }

    fn alloc_line(r: Reading) -> heapless::String<64> {
        use heapless::String;
        let mut s: String<64> = String::new();
        let _ = core::fmt::write(
            &mut s,
            format_args!("T={:.2}°C RH={:.2}%\r", r.temperature_c, r.humidity_rh),
        );
        s
    }

    fn alloc_str(msg: &str) -> heapless::String<64> {
        use heapless::String;
        let mut s: String<64> = String::new();
        let _ = s.push_str(msg);
        s
    }
}

#[cfg(not(feature = "firmware"))]
fn main() {
    use std::thread;
    use std::time::Duration;
    println!("Simulation firmware (sans carte) — Ctrl+C pour quitter");

    let mut t: f32 = 22.0;
    let mut rh: f32 = 45.0;

    loop {
        let raw_t = (((t + 40.0) / 165.0) * 65536.0).clamp(0.0, 65535.0) as u16;
        let raw_rh = ((rh / 100.0) * 65536.0).clamp(0.0, 65535.0) as u16;

        let r = hdc1080_convert(raw_t, raw_rh);
        println!(
            "[{}] T={:.2}°C RH={:.2}%",
            humantime::format_rfc3339_seconds(std::time::SystemTime::now()),
            r.temperature_c,
            r.humidity_rh
        );

        t += 0.05;
        if t > 27.0 {
            t = 22.0;
        }
        rh += 0.2;
        if rh > 65.0 {
            rh = 45.0;
        }

        thread::sleep(Duration::from_millis(1000));
    }
}
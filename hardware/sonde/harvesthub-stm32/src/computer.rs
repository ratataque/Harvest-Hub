use prost::Message;
use harvesthub_stm32::protobuf::measurement::Measure;
use std::{thread, time::Duration};

pub fn run() {
    println!("Computer Simulation:");
    let (mut t, mut rh) = (20.0f32, 40.0f32);

    loop {
        let msg = Measure { temperature_c: t, humidity_rh: rh };

        let mut buf = Vec::new();
        msg.encode(&mut buf).unwrap();

        print!("\nTX: ");
        for b in &buf { print!("{:02X} ", b); }

        let msg2 = Measure::decode(buf.as_slice()).unwrap();
        println!("\nMeasure: T={:.2}°C  RH={:.2}%", msg2.temperature_c, msg2.humidity_rh);

        t += 0.3;
        rh += 0.7;
        thread::sleep(Duration::from_secs(1));
    }
}

#![allow(dead_code)]

extern crate alloc;
use alloc::vec::Vec;

use prost::Message;
use harvesthub_stm32::protobuf::measurement::Measure;

/// Firmware loop (no_std + alloc). No #[entry] here.
/// The real entry lives in src/main.rs to keep allocator at crate root.
pub fn run() -> ! {
    let (mut t, mut rh) = (20.0f32, 40.0f32);

    loop {
        let msg = Measure { temperature_c: t, humidity_rh: rh };

        let mut buf = Vec::new();
        msg.encode(&mut buf).unwrap();

        // TODO: replace with your UART/USB send
        send_bytes(&buf);

        t += 0.3; rh += 0.7;
    }
}

fn send_bytes(_data: &[u8]) {
    // Example for later:
    // for &b in data { nb::block!(uart.write(b)).ok(); }
}
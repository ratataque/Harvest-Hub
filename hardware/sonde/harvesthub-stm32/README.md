# harvesthub-stm32

Deux modes:
- **Simulation PC**: `cargo run`
- **Firmware STM32F103C8**: `rustup target add thumbv7m-none-eabi && cargo build --release --target thumbv7m-none-eabi --features firmware`

Flash (quand carte disponible):
```
cargo install probe-rs-tools
cargo flash --chip STM32F103C8Tx --release --features firmware
```

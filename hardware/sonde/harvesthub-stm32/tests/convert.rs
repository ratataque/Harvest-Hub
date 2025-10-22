use harvesthub_stm32::sensor::hdc1080_convert;

#[test]
fn hdc1080_edges() {
    let r0 = hdc1080_convert(0, 0);
    assert!((r0.temperature_c + 40.0).abs() < 0.05);
    assert!((r0.humidity_rh - 0.0).abs() < 0.05);

    let r1 = hdc1080_convert(u16::MAX, u16::MAX);
    assert!((r1.temperature_c - 125.0).abs() < 0.2);
    assert!((r1.humidity_rh - 100.0).abs() < 0.2);
}

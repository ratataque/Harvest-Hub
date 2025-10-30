use prost::Message;
use harvesthub_stm32::protobuf::measurement::Measure;

#[test]
fn measure_encode_decode() {
    let original = Measure {
        temperature_c: 23.5,
        humidity_rh: 45.0,
    };

    // encode
    let mut buf = Vec::new();
    original.encode(&mut buf).expect("encode failed");
    assert!(!buf.is_empty(), "encoded buffer should not be empty");

    // decode
    let decoded = Measure::decode(buf.as_slice()).expect("decode failed");

    // floating-point comparisons: allow a small epsilon
    let eps = 1e-6;
    assert!((decoded.temperature_c - original.temperature_c).abs() < eps);
    assert!((decoded.humidity_rh   - original.humidity_rh).abs()   < eps);
}

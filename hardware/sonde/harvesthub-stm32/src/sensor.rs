#[derive(Debug, Clone, Copy)]
pub struct Reading {
    pub temperature_c: f32,
    pub humidity_rh: f32,
}

/// Convertit 2x16 bits bruts (HDC1080 / compatibles) en (°C, %RH).
/// Formules usuelles:
///   T[°C] = (raw_T / 65536.0) * 165.0 - 40.0
///   RH[%] = (raw_RH / 65536.0) * 100.0
pub fn hdc1080_convert(raw_t: u16, raw_rh: u16) -> Reading {
    let t = (raw_t as f32) / 65536.0 * 165.0 - 40.0;
    let rh = ((raw_rh as f32) / 65536.0) * 100.0;
    let rh = rh.clamp(0.0, 100.0);
    Reading { temperature_c: t, humidity_rh: rh }
}

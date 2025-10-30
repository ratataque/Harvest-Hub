fn main() -> Result<(), Box<dyn std::error::Error>> {
    println!("cargo:rerun-if-changed=proto/measurement.proto");

    let protoc = protoc_bin_vendored::protoc_bin_path()?;
    std::env::set_var("PROTOC", protoc);

    prost_build::Config::new()
        .compile_protos(&["proto/measurement.proto"], &["proto"])?;
    Ok(())
}
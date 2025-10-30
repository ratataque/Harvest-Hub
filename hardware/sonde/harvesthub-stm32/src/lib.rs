#![cfg_attr(not(feature = "computer"), no_std)]
extern crate alloc;

pub mod protobuf {
    pub mod measurement {
        include!(concat!(env!("OUT_DIR"), "/measurement.rs"));
    }
}
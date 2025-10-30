// --- crate-wide attributes for firmware build ---
#![cfg_attr(all(feature = "firmware", not(feature = "computer")), no_std)]
#![cfg_attr(all(feature = "firmware", not(feature = "computer")), no_main)]

// ===== PC (computer) entry =====

#[cfg(feature = "computer")]
mod computer;

#[cfg(feature = "computer")]
fn main() {
    computer::run();
}

// ===== Firmware (no_std) entry =====

#[cfg(all(feature = "firmware", not(feature = "computer")))]
mod firmware;

#[cfg(all(feature = "firmware", not(feature = "computer")))]
extern crate alloc;

#[cfg(all(feature = "firmware", not(feature = "computer")))]
use cortex_m_rt::entry;

#[cfg(all(feature = "firmware", not(feature = "computer")))]
use cortex_m as _;

#[cfg(all(feature = "firmware", not(feature = "computer")))]
use embedded_alloc::LlffHeap as Heap;

#[cfg(all(feature = "firmware", not(feature = "computer")))]
use panic_halt as _;

#[cfg(all(feature = "firmware", not(feature = "computer")))]
#[global_allocator]
static ALLOCATOR: Heap = Heap::empty();

#[cfg(all(feature = "firmware", not(feature = "computer")))]
#[entry]
fn main() -> ! {
    const HEAP_SIZE: usize = 8 * 1024;
    #[allow(non_upper_case_globals)]
    static mut HEAP: [u8; HEAP_SIZE] = [0; HEAP_SIZE];

    unsafe {
        let start = core::ptr::addr_of_mut!(HEAP) as usize;
        ALLOCATOR.init(start, HEAP_SIZE);
    }

    firmware::run()
}
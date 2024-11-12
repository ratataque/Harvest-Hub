"use client";

import Image from "next/image";

export default function QuadrillageView() {
  return (
    <div className="w-full h-full flex flex-row">
      <div
        className="bg-white/70 w-[45%] h-[90%] ml-8 mt-4 rounded-xl shadow-test opacity-100 rounded-[16% 84% 18% 82% / 56% 81% 19% 44%]"
        style={{
          borderRadius: "27% 73% 18% 82% / 56% 81% 19% 44%",
        }}
      ></div>
    </div>
  );
}

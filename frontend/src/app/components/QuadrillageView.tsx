"use client";

import Image from "next/image";

export default function QuadrillageView() {
  return (
    <div className="w-full h-full flex flex-row-reverse px-8">
      <div
        className="bg-gray-900/70 w-[45%] h-[90%] ml-8 mt-4 rounded-xl shadow-test opacity-100 rounded-[16% 84% 18% 82% / 56% 81% 19% 44%]"
        style={{
          borderRadius: "72% 28% 23% 77% / 68% 76% 24% 32%",
        }}
      ></div>
    </div>
  );
}

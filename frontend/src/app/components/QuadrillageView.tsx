"use client";

import Image from "next/image";

export default function QuadrillageView() {
  return (
    <div className="w-full h-full flex flex-row-reverse flex-grow px-8 relative">
      <div
        className="bg-gray-800/70 w-[40%] h-[90%] ml-8 mt-4 rounded-xl shadow-test opacity-100 rounded-[16% 84% 18% 82% / 56% 81% 19% 44%] text-xl font-900 backdrop-blur"
        style={{
          borderRadius: "72% 28% 23% 77% / 68% 76% 24% 32%",
        }}
      >
        <div className="px-8 text-center justify-center flex items-center flex-col h-full text-white">
          Le tout disponible dans une application pratique et ludique.
          <br />
          <br />
          Consulter en temps reel l&apos;etat de santé des plantes de votre
          jardin, ou de votre balcon.
        </div>
      </div>

      <Image
        src="/images/preview_appli.png"
        alt="Picture of the author"
        width={2000}
        height={2000}
        className="w-[60%] object-contain"
      />

      <Image
        src="/images/fougere_downscaled.png"
        alt="Picture of the author"
        width={2000}
        height={2000}
        // className="w-96 transform rotate-[-68deg]"
        className="w-96 absolute bottom-[-150px] transform rotate-[-68deg] left-[-120px] z-[-1]"
      />

      <Image
        src="/images/fougere_downscaled.png"
        alt="Picture of the author"
        width={2000}
        height={2000}
        // className="w-96 transform rotate-[-68deg]"
        className="w-96 absolute transform rotate-[-38deg] top-[-130px] right-[-150px] scale-x-[-1] z-[-1]"
      />
    </div>
  );
}

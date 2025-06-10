"use client";
import React from "react";
import Image from "next/image";

export default function GeneralView() {
  return (
    <div className="h-full w-full flex-col flex gap-7 justify-center items-center relative">
      <div
        className="text-6xl text-gray-200 font-mono"
        style={{ textShadow: "0px 0px 10px #000" }}
      >
        Un equipement
      </div>
      <div className="h-2/3 w-full flex justify-center items-center relative">
        {/*<div className="w-full h-full top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 absolute">
          <Image src="/images/curved-arrow.svg" alt="Arrow image" width={2000} height={2000} className="top-1/2 left-1/2 translate-x-[-155%] translate-y-[-70%] w-32 h-32 rotate-[-10deg] absolute"/>
          <Image src="/images/curved-arrow.svg" alt="Arrow image" width={2000} height={2000} className="top-1/2 left-1/2 translate-x-[55%] translate-y-[-65%] w-32 h-32 rotate-[100deg] absolute"/>
          <Image src="/images/curved-arrow.svg" alt="Arrow image" width={2000} height={2000} className="top-1/2 left-1/2 translate-x-[-50%] translate-y-[80%] w-32 h-32 rotate-[-135deg] absolute"/>
        </div>*/}
        <div className="w-full h-full flex justify-center items-center absolute">
          <Image
            src="/images/blob-haikei.svg"
            alt="Background blob"
            width={2000}
            height={2000}
            className="w-full h-full"
          />
        </div>
        <div className="flex flex-col w-full h-full justify-center items-center relative">
          <div className="flex w-full justify-center items-center">
            <div className="flex w-full h-full flex-col justify-center items-center">
              <Image
                src="/images/gif/Harvest-Hub-v6-unscreen.gif"
                alt="Background blob"
                width={2000}
                height={2000}
                className="animation-extrafloat container-product container-hub min-w-[32px] min-h-[40px] w-[80%] h-[50vw] sm:w-[20vw] sm:h-[25vw] max-w-[220px] max-h-[250px] relative"
              />
              <div className="uppercase font-mono font-bold text-black p-1 bg-white rounded-md px-2">
                Un centre de traitement
              </div>
            </div>
          </div>
          <div className="flex w-full justify-center items-center">
            <div className="flex w-full justify-center items-center flex-col">
              <Image
                src="/images/gif/Garden-Pin-v8-unscreen.gif"
                alt="Background blob"
                width={2000}
                height={2000}
                className="animation-extrafloat container-product container-hub min-w-[32px] min-h-[40px] w-[80%] h-[50vw] sm:w-[20vw] sm:h-[25vw] max-w-[220px] max-h-[250px] relative"
              />
              <div className="uppercase font-mono font-bold text-black p-1 bg-white rounded-md px-2">
                Des capteurs
              </div>
            </div>
            <div className="min-w-[23px]  w-[10%] md:w-[14vw] max-w-[190px] aspect-square relative"></div>
            <div className="flex w-full justify-center items-center flex-col">
              <Image
                src="/images/gif/Iphone-v2-unscreen.gif"
                alt="Background blob"
                width={2000}
                height={2000}
                className="animation-extrafloat container-product container-hub min-w-[32px] min-h-[40px] w-[80%] h-[50vw] sm:w-[20vw] sm:h-[25vw] max-w-[220px] max-h-[250px] relative"
              />
              <div className="uppercase font-mono font-bold text-black p-1 bg-white rounded-md px-2">
                Une application
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="text-6xl text-gray-200 font-mono"
        style={{ textShadow: "0px 0px 10px #000" }}
      >
        Qui communique
      </div>

      <Image
        src="/images/fougere_downscaled.png"
        alt="Picture of the author"
        width={2000}
        height={2000}
        // className="w-96 transform rotate-[-68deg]"
        className="w-96 absolute scale-x-[-1] bottom-[-150px] transform rotate-[68deg] right-[-100px] z-[-1]"
      />

      <Image
        src="/images/fougere_downscaled.png"
        alt="Picture of the author"
        width={2000}
        height={2000}
        // className="w-96 transform rotate-[-68deg]"
        className="w-96 absolute transform rotate-[38deg] top-[20px] left-[-180px] scale-x-[-1] z-[-1]"
      />
    </div>
  );
}

"use client";
import React from "react";
import Image from "next/image";

export default function HubView() {

  return (
    <div className="h-full w-full flex-col flex gap-7 justify-center items-center relative">
      <div className="text-6xl font-black font-mono">
        Un centre de traitement
      </div>
      <div className="h-2/3 w-full flex justify-center items-center relative">
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
          <Image
            src="/images/gif/Harvest-Hub-v6-unscreen.gif"
            alt="Background blob"
            width={2000}
            height={2000}
            className="animation-extrafloat container-product container-hub min-w-[32px] min-h-[40px] w-[80%] h-[50vw] sm:w-[30vw] sm:h-[35vw] max-w-[320px] max-h-[350px] relative"
          />
        </div>
      </div>

      <Image
        src="/images/fougere.png"
        alt="Picture of the author"
        width={2000}
        height={2000}
        // className="w-96 transform rotate-[-68deg]"
        className="w-96 absolute scale-x-[-1] bottom-[-180px] transform rotate-[60deg] right-[-10vw] sm:right-[-5vw] md:right-[0vw] lg:right-[15vw]  z-[-1]"
      />

      <Image
        src="/images/fougere.png"
        alt="Picture of the author"
        width={2000}
        height={2000}
        // className="w-96 transform rotate-[-68deg]"
        className="w-96 absolute bottom-[-180px] transform rotate-[-60deg] left-[-10vw] sm:left-[-5vw] md:left-[0vw] lg:left-[15vw] z-[-1]"
      />
    </div>
  );
}

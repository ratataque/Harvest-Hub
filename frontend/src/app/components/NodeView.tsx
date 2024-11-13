"use client";
import React from "react";
import Image from "next/image";

export default function NodeView() {
  return (
    <div className="h-full w-full flex-col flex gap-7 justify-center items-center relative">
      <div className="text-5xl font-black font-mono">
        Une sonde pour la terre
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
        <div className="absolute w-[30%] left-7 text-lg font-800 text-gray-900 text-left top-20">
          La croissance des plantes dépend de la température du sol. Un capteur
          ajuste l&apos;arrosage en fonction de la chaleur et de l&apos;humidité
          du sol, améliorant ainsi l&apos;hydratation et la protection des
          cultures.
        </div>
        <div className="flex flex-col w-full h-full justify-center items-center relative">
          <Image
            src="/images/gif/Garden-Pin-v8-unscreen.gif"
            alt="Background blob"
            width={2000}
            height={2000}
            className="animation-extrafloat container-product container-hub min-w-[32px] min-h-[40px] w-[80%] h-[50vw] sm:w-[30vw] sm:h-[35vw] max-w-[320px] max-h-[350px] relative"
          />
        </div>

        <div className="absolute w-[30%] right-7 text-lg font-800 text-gray-900 text-right top-20">
          Une application propose des plantations adaptées au climat et aux
          besoins des plantes. Une sonde pH optionnelle, utile pour les petits
          espaces, régule l&apos;acidité du sol afin d&apos;optimiser
          l&apos;absorption des nutriments.
        </div>
      </div>

      <Image
        src="/images/fougere_downscaled.png"
        alt="Picture of the author"
        width={2000}
        height={2000}
        // className="w-96 transform rotate-[-68deg]"
        className="w-96 absolute scale-x-[-1] bottom-[-180px] transform rotate-[60deg] right-[-10vw] sm:right-[-5vw] md:right-[0vw] lg:right-[15vw]  z-[-1]"
      />

      <Image
        src="/images/fougere_downscaled.png"
        alt="Picture of the author"
        width={2000}
        height={2000}
        // className="w-96 transform rotate-[-68deg]"
        className="w-96 absolute bottom-[-180px] transform rotate-[-60deg] left-[-10vw] sm:left-[-5vw] md:left-[0vw] lg:left-[15vw] z-[-1]"
      />
    </div>
  );
}

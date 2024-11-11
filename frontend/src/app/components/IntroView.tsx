"use client";

import Image from "next/image";

export default function IntroView() {
  return (
    <div className="w-full h-full">
      <div className="bg-white w-[40%] h-[92%] ml-8 mt-4 rounded-xl shadow-test opacity-100">
        <div className="flex flex-col items-center pt-[57px] flex-nowrap justify-between h-full">
          <div className="text-center w-full h-[20vh] flex justify-center">
            <Image
              src="/images/logo.png"
              alt="Picture of the author"
              width={300}
              height={300}
              className="h-full w-[20vh]"
            />
            <svg
              className="absolute w-[40vh] h-[20vh] top-[40px]"
              viewBox="0 0 200 200"
            >
              <defs>
                <path
                  id="text-path"
                  d="M 100, 197 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
                />
              </defs>
              <text
                dy="-45"
                className={`text-4xl font-extrabold text-emerald-800`}
              >
                <textPath
                  href="#text-path"
                  textAnchor="middle"
                  startOffset="25%"
                >
                  Harvest Hub
                </textPath>
              </text>
            </svg>
          </div>
          <div className="text-center text-md text-black font-mono font-bold px-4 bottom-0 relative mb-[5vh]">
            Harvest Hub est un projet de jardin connecté qui combine IoT. IA.
            sécurité réseau, et applications web et mobile pour un suivi en
            temps réel de l'état des cultures ou des fleurs gråce å de multiples
            capteurs. La solution comprend également tautomatisation de
            I'arrosage et des conseils personnalisés via CIA. L'application
            propose des idées de recettes basées sur Ies récoltes, un systérne
            de gamification pour accumuler des points, ainsi qu'un jardin
            virtuel personnalisable avec Ies points obtenus. renforqant Caspect
            ludique et communautaire.
          </div>
        </div>

        <Image
          src="/images/fougere.png"
          alt="Picture of the author"
          width={100}
          height={100}
          // className="w-96 transform rotate-[-68deg]"
          className="w-96 absolute bottom-[-150px] transform rotate-[-68deg] left-[-100px] z-[-1]"
        />
      </div>
    </div>
  );
}

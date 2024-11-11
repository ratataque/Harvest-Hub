"use client";

import Image from "next/image";

export default function IntroView() {
  return (
    <div className="w-full h-full flex flex-row">
      <div
        className="bg-white/70 w-[45%] h-[90%] ml-8 mt-4 rounded-xl shadow-test opacity-100 rounded-[16% 84% 18% 82% / 56% 81% 19% 44%]"
        style={{
          borderRadius: "27% 73% 18% 82% / 56% 81% 19% 44%",
        }}
      >
        {" "}
        <div className="flex flex-col items-center pt-[27px] flex-nowrap h-full">
          <div className="text-center w-full h-[25vh] flex mb-3">
            <Image
              src="/images/logo_with_name.png"
              alt="Picture of the author"
              width={2000}
              height={2000}
              className="h-full w-auto ml-[80px]"
            />
          </div>
          <div className="transform w-[95%] flex flex-col flex-nowrap relative flex-grow text-left text-xs md:text-sm lg:text-lg/6 text-black font-mono font-bold px-3">
            <div className=" px-4 relative left-[-10px] w-[96%]">
              Harvest Hub est un projet de jardin connecté
            </div>
            <div className=" px-4 relative left-[-20px] w-[104%]">
              qui combine IoT. IA. sécurité réseau, et applications web et
              mobile pour un suivi en temps
            </div>
            <div className=" px-4 relative left-[-23px] w-[104%]">
              réel de l'état des cultures ou des fleurs gråce å
            </div>
            <div className=" px-4 relative left-[-22px] w-[96%]">
              de multiples capteurs. La solution comprend
            </div>
            <div className=" px-4 relative left-[-15px] w-[100%]">
              également tautomatisation de I'arrosage et des
            </div>
            <div className=" px-4 relative left-[-8px] w-[96%]">
              conseils personnalisés via IA.{" "}
            </div>
            <div className=" px-4 relative left-[4px] w-[108%]">
              L'application propose des idées de recettes basées
            </div>
            <div className=" px-4 relative left-[22px] w-[96%]">
              sur les récoltes, un systérne de gamification
            </div>
            <div className=" px-4 relative left-[49px] w-[96%]">
              pour accumuler des points, ainsi qu'un jardin
            </div>
            <div className=" px-4 relative left-[75px] w-[96%]">
              virtuel personnalisable avec Ies points
            </div>
            <div className=" px-4 relative left-[125px] w-[96%]">
              obtenus. renforqant Caspect ludique et
            </div>
            <div className=" px-4 relative left-[185px] w-[96%]">
              communautaire.
            </div>
          </div>
        </div>
      </div>
      <div className="w-auto h-full flex justify-center items-center flex-grow flex-col">
        <Image
          src="/images/garden.png"
          alt="Picture of the author"
          width={2000}
          height={2000}
          className="w-auto h-[70%] animate-float"
          // className="w-96 absolute bottom-[-150px] transform rotate-[-68deg] left-[-100px] z-[-1]"
          // id="jardinier"
        />
        <div
          className="bottom-[120px] w-[400px] h-[30px] shadow-[0_75px_55px_rgba(0,0,0,0.95)] rounded-[50%] absolute animate-aggrandi"
          style={
            {
              // background:
              // "radial-gradient(circle, rgba(81, 139, 117, 1) 0%, rgba(30,49,63,0) 60%)",
              // clipPath: "ellipse(100px 20px)",
            }
          }
        ></div>
      </div>

      <Image
        src="/images/fougere.png"
        alt="Picture of the author"
        width={2000}
        height={2000}
        // className="w-96 transform rotate-[-68deg]"
        className="w-96 absolute bottom-[-150px] transform rotate-[-68deg] left-[-100px] z-[-1]"
      />

      <Image
        src="/images/fougere.png"
        alt="Picture of the author"
        width={2000}
        height={2000}
        // className="w-96 transform rotate-[-68deg]"
        className="w-96 absolute transform rotate-[-38deg] top-[-130px] right-[-150px] scale-x-[-1] z-[-1]"
      />
    </div>
  );
}

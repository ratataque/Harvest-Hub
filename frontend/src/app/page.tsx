"use client";

import { useState } from "react";
import Pages from "./components/Pages";

export default function Home() {
  const [isActive, setIsActive] = useState(true);

  window.addEventListener("wheel", function (handleScroll) {
    const scroll = handleScroll.deltaY;
    // console.log(scroll);
    if (scroll > 15) {
      setIsActive(false);
    } else if (scroll < -15) {
      setIsActive(true);
    }
  });

  return (
    <div className="flex flex-col m-0 p-0 w-screen items-center overflow-hidden">
      <div className="h-screen w-[100vw] absolute z-[-1]">
        <iframe
          className="h-full w-full"
          src="https://www.youtube.com/embed/Z3ztaf1NWeQ?&amp;controls=0&amp;showinfo=0&amp;modestbranding=1&amp;rel=0&amp;"
          title="YouTube video player"
          // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>

      <div className="flex flex-col items-center justify-center pt-[15vh]">
        <h1
          className="text-9xl text-white font-bold"
          style={{ textShadow: "0px 0px 10px #000" }}
        >
          Harvest Hub
        </h1>
      </div>

      <Pages
        className=""
        transTransi={`opacity-90 duration-[600ms] ${isActive ? "translate-y-[40vh] delay-[200ms]" : "translate-y-[-4vh] translate-x-[-4vw] scale-100"}`}
        scaleTransi={`duration-[500ms] delay-50 ${isActive ? "scale-[50%]" : "scale-100 delay-[90ms]"}`}
        color="bg-violet-400"
      />

      <Pages
        className=""
        transTransi={`opacity-95 duration-[500ms]  ${isActive ? "translate-y-[44vh] delay-[200ms]" : "translate-y-[-3vh] translate-x-[-3vw] scale-100"}`}
        scaleTransi={`duration-[500ms] delay-50 ${isActive ? "scale-[53%]" : "scale-100 delay-[90ms]"}`}
        color="bg-red-400"
      />

      <Pages
        className=""
        transTransi={`opacity-95 duration-[400ms] ${isActive ? "translate-y-[48vh] delay-[200ms]" : "translate-y-[-2vh] translate-x-[-2vw] scale-100"}`}
        scaleTransi={`duration-[500ms] delay-50 ${isActive ? "scale-[56%]" : "scale-100 delay-[90ms]"}`}
        color="bg-orange-400"
      />

      <Pages
        className=""
        transTransi={`duration-[300ms] ${isActive ? "translate-y-[52vh] delay-[200ms]" : "translate-y-[-1vh] translate-x-[-1vw] scale-100"}`}
        scaleTransi={`duration-[500ms] delay-30 ${isActive ? "scale-[59%]" : "scale-100 delay-[90ms]"}`}
        color="bg-yellow-400"
      />

      <Pages
        className=""
        transTransi={`duration-[200ms] ${isActive ? "translate-y-[56vh] delay-[200ms]" : "translate-y-0"}`}
        scaleTransi={`duration-[500ms] delay-10 ${isActive ? "scale-[62%]" : "scale-100 delay-[85ms]"}`}
        color="bg-green-400"
      />
    </div>
  );
}

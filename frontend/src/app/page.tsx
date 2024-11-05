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
        <h1 className="text-9xl text-white font-bold">Harvest Hub</h1>
      </div>

      <Pages
        className={`opacity-90 ${isActive ? "translate-y-[40vh] scale-[50%]" : "mt-20 mb-8 translate-y-0 scale-100"}`}
        color="bg-violet-400"
      />

      <Pages
        className={`opacity-95 ${isActive ? "translate-y-[44vh] scale-[53%]" : "mt-20 mb-8 translate-y-0 scale-100"}`}
        color="bg-red-400"
      />

      <Pages
        className={`opacity-95 ${isActive ? "translate-y-[48vh] scale-[56%]" : "mt-20 mb-8 translate-y-0 scale-100"}`}
        color="bg-orange-400"
      />

      <Pages
        className={`${isActive ? "translate-y-[52vh] scale-[59%]" : "mt-20 mb-8 translate-y-0 scale-100"}`}
        color="bg-yellow-400"
      />

      <Pages
        className={`${isActive ? "translate-y-[56vh] scale-[62%]" : "mt-20 mb-8 translate-y-0 scale-100"}`}
        color="bg-green-400"
      />
    </div>
  );
}

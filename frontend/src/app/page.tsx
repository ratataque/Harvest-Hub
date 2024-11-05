"use client";

import { useState } from "react";

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
          src="https://www.youtube.com/embed/1vsjcUCWL5E?si=xCt_Ssd546pmoKTM&amp;controls=0&amp;showinfo=0&amp;modestbranding=1&amp;rel=0&amp;"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>

      <div className="flex flex-col items-center justify-center pt-[15vh]">
        <h1 className="text-9xl text-white font-bold">Harvest Hub</h1>
      </div>

      <div
        className={`flex flex-col items-center justify-center rounded-3xl h-[88vh] w-[90vw] bg-pink-400 transform transition-all duration-500 absolute ${isActive ? "translate-y-[40vh] scale-50" : "mt-20 mb-8 translate-y-0 scale-100"}`}
      ></div>
    </div>
  );
}

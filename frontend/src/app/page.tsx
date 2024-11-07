"use client";

import { useEffect, useRef, useState } from "react";
import Pages from "./components/Pages";

export default function Home() {
  const scrollLocked = useRef(false);
  const [activePage, setActivePage] = useState(0);
  const [isHomeActive, setIsHomeActive] = useState(true);

  const handleScroll = (handleScroll: WheelEvent) => {
    const scroll = handleScroll.deltaY;

    if (!scrollLocked.current) {
      scrollLocked.current = true;

      if (scroll > 15) {
        setActivePage((prevPage) => Math.min(prevPage + 1, 5));
      } else if (scroll < -15) {
        setActivePage((prevPage) => Math.max(prevPage - 1, 0));
      }

      // console.log(activePage);
      setTimeout(() => (scrollLocked.current = false), 300);
    }
  };

  useEffect(() => {
    window.addEventListener("wheel", handleScroll);
    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, []);

  useEffect(() => {
    // console.log(activePage);
    if (activePage === 0) {
      setIsHomeActive(true);
    } else if (activePage === 1) {
      setIsHomeActive(false);
    } else {
      setIsHomeActive(true);
      console.log(isHomeActive);
      setTimeout(() => {
        setIsHomeActive(false);
      }, 650);
    }
  }, [activePage]);

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
        transTransi={`opacity-90 duration-[500ms] ${!(activePage === 1) ? "translate-y-[70vh] delay-[200ms]" : `!translate-y-0 ${isHomeActive ? "" : ""}`} ${!isHomeActive && activePage !== 1 ? "!translate-y-[90vh]" : "duration-[300ms]"}`}
        scaleTransi={`duration-[500ms] delay-50 ${!(activePage === 1) ? "scale-[50%]" : "scale-100 delay-[200ms]"}`}
        // style={{ transition: "z-index 0.5s step-end, opacity 0.5s linear" }}
        color="bg-violet-400"
      />

      <Pages
        className=""
        transTransi={`opacity-95 duration-[400ms]  ${!(activePage === 2) ? "translate-y-[74vh] delay-[200ms]" : "!duration-[600ms] !translate-y-0 delay-[600ms]"} ${!isHomeActive ? "!translate-y-[91vh]" : "duration-[350ms]"}`}
        scaleTransi={`duration-[500ms] delay-50 ${!(activePage === 2) ? "scale-[53%]" : "scale-100 delay-[800ms]"}`}
        color="bg-red-400"
      />

      <Pages
        className=""
        transTransi={`opacity-95 duration-[300ms] ${!(activePage === 3) ? "translate-y-[78vh] delay-[200ms]" : "!duration-[600ms] !translate-y-0 delay-[350ms]"} ${!isHomeActive && activePage !== 3 ? "!translate-y-[92vh]" : "!duration-[400ms]"}`}
        scaleTransi={`duration-[500ms] delay-50 ${!(activePage === 3) ? "scale-[56%]" : "scale-100 delay-[550ms]"}`}
        color="bg-orange-400"
      />

      <Pages
        className=""
        transTransi={`duration-[200ms] ${!(activePage === 4) ? "translate-y-[82vh] delay-[200ms]" : "!duration-[600ms] !translate-y-0 delay-[350ms]"} ${!isHomeActive && activePage !== 4 ? "!translate-y-[93vh]" : "!duration-[500ms]"}`}
        scaleTransi={`duration-[500ms] delay-30 ${!(activePage === 4) ? "scale-[59%]" : "scale-100 delay-[550ms]"}`}
        color="bg-yellow-400"
      />

      <Pages
        className=""
        transTransi={`duration-[100ms] ${!(activePage === 5) ? "translate-y-[86vh] delay-[200ms]" : "!duration-[600ms] !translate-y-0 delay-[350ms]"} ${!isHomeActive && activePage !== 5 ? "!translate-y-[94vh]" : "!duration-[600ms]"}`}
        scaleTransi={`duration-[500ms] delay-10 ${!(activePage === 5) ? "scale-[62%]" : "scale-100 delay-[550ms]"}`}
        color="bg-green-400"
      />
    </div>
  );
}

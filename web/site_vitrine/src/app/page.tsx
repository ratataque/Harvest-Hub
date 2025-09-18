"use client";

import { useEffect, useRef, useState } from "react";
import Pages from "./components/Pages";
import IntroView from "./components/IntroView";
import QuadrillageView from "./components/QuadrillageView";
import GeneralView from "./components/GeneralView";
import HubView from "./components/HubView";
import NodeView from "./components/NodeView";
import LastView from "./components/LastView";

export default function Home() {
  const focusRef = useRef<HTMLDivElement>(null);
  const scrollLocked = useRef(false);
  const currentPage = useRef(0);
  const [activePage, setActivePage] = useState(0);
  const [isHomeActive, setIsHomeActive] = useState(true);

  const playerRef = useRef<HTMLVideoElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [DisableAll, setDisableAll] = useState(false);

  const handleScroll = (handleScroll: WheelEvent) => {
    const scroll = handleScroll.deltaY;

    if (!scrollLocked.current) {
      scrollLocked.current = true;

      if (playerRef.current && playerRef.current.paused) {
        if (scroll > 15 && currentPage.current <= 6) {
          setPageDown();
        } else if (scroll < -15 && currentPage.current >= 0) {
          setPageUp();
        }
      }

      setTimeout(() => (scrollLocked.current = false), 600);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (playerRef.current) {
      if (event.key === "Escape") {
        returnHOme();
      }

      if (event.key === " " && currentPage.current === 0) {
        handleVideoClick();
      }
    }

    // console.log(playerRef.current);
    if (playerRef.current && playerRef.current.paused) {
      if (event.key === "j" && currentPage.current <= 6) {
        setPageDown();
      }
      if (event.key === "k" && currentPage.current >= 0) {
        setPageUp();
      }
    }
  };

  const handleVideoClick = () => {
    // console.log(playerRef.current.paused);
    if (playerRef.current && !playerRef.current.paused) {
      console.log("pause");
      // playerRef.current.pause(); // Pause video if Escape is pressed
      returnHOme();
    } else {
      console.log("play");
      if (playerRef.current) {
        playerRef.current.play();
      }
      setIsVideoPlaying(true);
      setTimeout(() => {
        setDisableAll(true);
      }, 300);
    }
  };

  const returnHOme = () => {
    setTimeout(() => {
      setIsVideoPlaying(false); // Hide overlay on Escape
    }, 50);
    setDisableAll(false);
    if (playerRef.current && !playerRef.current.paused) {
      playerRef.current.pause(); // Pause video if Escape is pressed
      console.log("pause");
    }

    setIsHomeActive(true);
    setActivePage(-1);
    setActivePage(0);
  };

  const setPageDown = () => {
    if (currentPage.current === 0) {
      setIsHomeActive(false);
      setActivePage(1);
    } else {
      setIsHomeActive(true);
      setActivePage(-1);
      setTimeout(() => {
        setIsHomeActive(false);
        setActivePage(
          Math.min(currentPage.current !== 6 ? currentPage.current + 1 : 0, 6),
        );
      }, 550);
    }
  };

  const setPageUp = () => {
    if (currentPage.current === 0) {
      setIsHomeActive(false);
      setActivePage(6);
    } else {
      setIsHomeActive(true);
      setActivePage(-1);
      setTimeout(() => {
        setIsHomeActive(false);
        setActivePage(
          Math.max(currentPage.current ? currentPage.current - 1 : 6, 0),
        );
      }, 550);
    }
  };

  useEffect(() => {
    focusRef.current?.focus();

    if (playerRef.current) {
      playerRef.current.load();
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("wheel", handleScroll);
    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("wheel", handleScroll);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    // console.log(activePage);
    if (activePage === 0) {
      setIsHomeActive(true);
    }
    if (activePage !== -1) {
      currentPage.current = activePage;
    }
  }, [activePage]);

  return (
    <div
      className="flex flex-col m-0 p-0 w-screen items-center overflow-hidden"
      autoFocus={true}
    >
      <div className="h-screen w-[100vw] absolute z-[-2]">
        <video
          ref={playerRef}
          className="w-full h-full object-cover"
          controls={false}
          preload="none"
        >
          <source src="/videos/HarvestHub.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div
        className={`cursor-pointer z-10 text-white mr-20 pt-3 absolute right-0 text-5xl w-fit opacity-0 transition-opacity duration-300 ${isVideoPlaying ? "opacity-100" : ""}`}
        style={{ textShadow: "0px 0px 5px #000" }}
        onClick={() => returnHOme()}
      >
        X
      </div>
      <div
        onClick={() => handleVideoClick()}
        className={`text-white h-screen w-screen bg-black absolute z-[-1] cursor-pointer bottom-0 transition-opacity duration-300 flex flex-col justify-center items-center ${isVideoPlaying ? "opacity-0" : ""}`}
        style={{
          background:
            "radial-gradient(circle, rgba(19,22,28,1) 26%, rgba(79,91,113,1) 100%)",
          // "radial-gradient(circle, rgba(79,91,113,1) 26%, rgba(19,22,28,1) 91%)",
          // "radial-gradient(circle, rgba(10,10,10,1) 73%, rgba(79,78,78,1) 90%, rgba(145,143,143,1) 100%)",
        }}
      >
        <svg
          height="100px"
          width="100px"
          viewBox="0 0 168.071 168.071"
          fill="#000000"
        >
          <g>
            <path
              style={{ fill: "#729067" }}
              d="M154.932,91.819L42.473,27.483c-2.219-1.26-4.93-1.26-7.121-0.027 c-2.219,1.233-3.588,3.533-3.615,6.026L31.08,161.059c0,0,0,0,0,0.027c0,2.465,1.369,4.766,3.533,6.026 c1.123,0.63,2.355,0.959,3.615,0.959c1.205,0,2.438-0.301,3.533-0.931l113.116-63.214c2.219-1.26,3.588-3.533,3.588-6.053 c0,0,0,0,0-0.027C158.465,95.38,157.123,93.079,154.932,91.819z"
            />
            <g>
              <path
                style={{ fill: "#eeeeee" }}
                d="M79.952,44.888L79.952,44.888c3.273-3.273,2.539-8.762-1.479-11.06l-7.288-4.171 c-2.75-1.572-6.212-1.109-8.452,1.128l0,0c-3.273,3.273-2.539,8.762,1.479,11.06l7.291,4.169 C74.25,47.589,77.712,47.126,79.952,44.888z"
              />
              <path
                style={{ fill: "#eeeeee" }}
                d="M133.459,65.285L99.103,45.631c-2.75-1.572-6.209-1.109-8.449,1.128l0,0 c-3.273,3.273-2.539,8.759,1.479,11.057l23.497,13.44L23.931,122.5l0.52-103.393l19.172,10.964 c2.722,1.558,6.152,1.098,8.367-1.12l0.104-0.104c3.24-3.24,2.514-8.674-1.463-10.95L21,0.948 c-2.219-1.26-4.93-1.26-7.121-0.027c-2.219,1.233-3.588,3.533-3.615,6.026L9.607,134.524c0,0,0,0,0,0.027 c0,2.465,1.369,4.766,3.533,6.026c1.123,0.63,2.355,0.959,3.615,0.959c1.205,0,2.438-0.301,3.533-0.931l113.116-63.214 c2.219-1.26,3.588-3.533,3.588-6.053c0,0,0,0,0-0.027C136.992,68.845,135.65,66.545,133.459,65.285z"
              />
            </g>
          </g>
        </svg>
        <div className="absolute top-[63vh] text-xs animate-float">
          Clique sur le bouton ou presse espace
        </div>
      </div>

      <div
        className={`pointer-events-auto flex flex-col items-center justify-center pt-[15vh] transition-opacity duration-300 opacity-100 ${isVideoPlaying ? "!opacity-0" : ""} ${DisableAll ? "hidden" : ""}`}
      >
        <h1
          className="text-9xl text-white font-bold font-santa-catalina"
          style={{ textShadow: "0px 0px 10px #000" }}
        >
          Harvest Hub
        </h1>
      </div>

      <div
        className={`absolute h-full w-full flex justify-center pointer-events-none transition-opacity duration-300 ${isVideoPlaying ? "opacity-0" : ""} ${DisableAll ? "hidden" : ""}`}
      >
        <Pages
          className=""
          transTransi={`duration-[460ms] ${!(activePage === 1) ? "translate-y-[69vh] delay-[200ms] " : "!translate-y-0"} ${!isHomeActive && activePage !== 1 ? "!translate-y-[90vh]" : "duration-[300ms]"}`}
          scaleTransi={`duration-[500ms] delay-50 ${!(activePage === 1) ? "scale-[50%]" : "scale-100 delay-[140ms]"}`}
          // style={{ transition: "z-index 0.5s step-end, opacity 0.5s linear" }}
          color="bg-gray-700/[.97]"
          title={{ color: "text-gray-300", txt: "Presentation_Global.pdf" }}
          content={<IntroView />}
        />

        <Pages
          className=""
          transTransi={`opacity-99 duration-[400ms]  ${!(activePage === 2) ? "translate-y-[73vh] delay-[200ms]" : "!translate-y-0 !duration-[500ms]"} ${!isHomeActive && activePage !== 2 ? "!translate-y-[91vh]" : "duration-[300ms]"}`}
          scaleTransi={`duration-[500ms] delay-50 ${!(activePage === 2) ? "scale-[53%]" : "scale-100 delay-[170ms]"}`}
          color="bg-gray-600"
          title={{ color: "text-gray-300", txt: "Vue_General.pdf" }}
          content={<GeneralView />}
        ></Pages>

        <Pages
          className=""
          transTransi={`opacity-99 duration-[300ms] ${!(activePage === 3) ? "translate-y-[77vh] delay-[200ms]" : "!translate-y-0 !duration-[500ms]"} ${!isHomeActive && activePage !== 3 ? "!translate-y-[92vh]" : "duration-[300ms]"}`}
          scaleTransi={`duration-[500ms] delay-50 ${!(activePage === 3) ? "scale-[56%]" : "scale-100 delay-[170ms]"}`}
          color="bg-gray-500"
          title={{ color: "text-gray-300", txt: "Details_Hub.pdf" }}
          content={<HubView />}
        ></Pages>

        <Pages
          className=""
          transTransi={`duration-[200ms] ${!(activePage === 4) ? "translate-y-[81vh] delay-[200ms]" : "!translate-y-0 !duration-[500ms]"} ${!isHomeActive && activePage !== 4 ? "!translate-y-[93vh]" : "duration-[300ms]"}`}
          scaleTransi={`duration-[500ms] delay-30 ${!(activePage === 4) ? "scale-[59%]" : "scale-100 delay-[170ms]"}`}
          color="bg-gray-400"
          title={{ color: "text-gray-600", txt: "Details_Node.pdf" }}
          content={<NodeView />}
        ></Pages>

        <Pages
          className=""
          transTransi={`duration-[100ms] ${!(activePage === 5) ? "translate-y-[85vh] delay-[200ms]" : "!translate-y-0 !duration-[500ms]"} ${!isHomeActive && activePage !== 5 ? "!translate-y-[94vh]" : "duration-[300ms]"}`}
          scaleTransi={`duration-[500ms] delay-10 ${!(activePage === 5) ? "scale-[62%]" : "scale-100 delay-[170ms]"}`}
          color="bg-gray-300"
          title={{ color: "text-gray-500", txt: "Presentaion_app.pdf" }}
          content={<QuadrillageView />}
        ></Pages>

        <Pages
          className=""
          transTransi={`duration-[100ms] ${!(activePage === 6) ? "translate-y-[89vh] delay-[200ms]" : "!translate-y-0 !duration-[500ms]"} ${!isHomeActive && activePage !== 6 ? "!translate-y-[94vh]" : "duration-[300ms]"}`}
          scaleTransi={`duration-[500ms] delay-10 ${!(activePage === 6) ? "scale-[65%]" : "scale-100 delay-[170ms]"}`}
          color="bg-gray-200"
          title={{ color: "text-gray-500", txt: "Video_de_fin.pdf" }}
          content={<LastView pageActive={activePage === 6} />}
        ></Pages>
      </div>
    </div>
  );
}

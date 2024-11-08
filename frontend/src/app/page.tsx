"use client";

import { useEffect, useRef, useState } from "react";
import Pages from "./components/Pages";

export default function Home() {
  const focusRef = useRef<HTMLDivElement>(null);
  const scrollLocked = useRef(false);
  const currentPage = useRef(0);
  const [activePage, setActivePage] = useState(0);
  const [isHomeActive, setIsHomeActive] = useState(true);

  const playerRef = useRef<any>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [DisableAll, setDisableAll] = useState(false);

  const handleScroll = (handleScroll: WheelEvent) => {
    const scroll = handleScroll.deltaY;

    if (!scrollLocked.current) {
      // console.log(isHomeActive);
      scrollLocked.current = true;

      if (!playerRef.current || playerRef.current?.getPlayerState() !== 1) {
        if (scroll > 15 && currentPage.current <= 5) {
          // console.log(currentPage.current);
          setPageDown();
        } else if (scroll < -15 && currentPage.current >= 0) {
          setPageUp();
        }
      }

      // console.log(activePage);
      setTimeout(() => (scrollLocked.current = false), 600);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (playerRef.current) {
      if (event.key === "Escape") {
        returnHOme();
      }

      if (event.key === " ") {
        handleVideoClick();
      }
    }

    if (!playerRef.current || playerRef.current?.getPlayerState() !== 1) {
      if (event.key === "j" && currentPage.current <= 5) {
        setPageDown();
      }
      if (event.key === "k" && currentPage.current >= 0) {
        setPageUp();
      }
    }
  };

  const handleVideoClick = () => {
    if (playerRef.current) {
      // 1 == playing, 2 == paused
      if (playerRef.current.getPlayerState() === 1) {
        playerRef.current.pauseVideo(); // Pause video if Escape is pressed
      } else {
        playerRef.current.playVideo(); // Play video using the Player API
        setIsVideoPlaying(true);
        setTimeout(() => {
          setDisableAll(true);
        }, 300);
      }
    }
  };

  const returnHOme = () => {
    setTimeout(() => {
      setIsVideoPlaying(false); // Hide overlay on Escape
    }, 50);
    setDisableAll(false);
    if (playerRef.current) {
      playerRef.current.pauseVideo(); // Pause video if Escape is pressed
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
          Math.min(currentPage.current !== 5 ? currentPage.current + 1 : 0, 5),
        );
      }, 550);
    }
  };

  const setPageUp = () => {
    if (currentPage.current === 0) {
      setIsHomeActive(false);
      setActivePage(5);
    } else {
      setIsHomeActive(true);
      setActivePage(-1);
      setTimeout(() => {
        setIsHomeActive(false);
        setActivePage(
          Math.max(currentPage.current ? currentPage.current - 1 : 5, 0),
        );
      }, 550);
    }
  };

  useEffect(() => {
    focusRef.current?.focus();

    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);

      // Once the API is ready, set up the player
      window.onYouTubeIframeAPIReady = () => {
        playerRef.current = new window.YT.Player("yt-player");
      };
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
        <iframe
          id="yt-player"
          className="h-full w-full"
          src="https://www.youtube.com/embed/Z3ztaf1NWeQ?&amp;enablejsapi=1&amp;controls=0&amp;showinfo=0&amp;modestbranding=1&amp;rel=0&amp;"
          title="YouTube video player"
          // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
      <div
        onClick={() => handleVideoClick()}
        className={`h-screen w-[100vw] absolute z-[-1] cursor-pointer`}
      >
        <div
          className={`text-white mr-20 pt-3 absolute right-0 text-5xl w-fit opacity-0 transition-opacity duration-300 ${isVideoPlaying ? "opacity-100" : ""}`}
          onClick={() => returnHOme()}
        >
          Escape
        </div>
      </div>

      <div
        className={`pointer-events-auto flex flex-col items-center justify-center pt-[15vh] transition-opacity duration-300 opacity-100 ${isVideoPlaying ? "!opacity-0" : ""} ${DisableAll ? "hidden" : ""}`}
      >
        <h1
          className="text-9xl text-white font-bold"
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
          transTransi={`opacity-90 duration-[460ms] ${!(activePage === 1) ? "translate-y-[70vh] delay-[200ms] " : "!translate-y-0"} ${!isHomeActive && activePage !== 1 ? "!translate-y-[90vh]" : "duration-[300ms]"}`}
          scaleTransi={`duration-[500ms] delay-50 ${!(activePage === 1) ? "scale-[50%]" : "scale-100 delay-[140ms]"}`}
          // style={{ transition: "z-index 0.5s step-end, opacity 0.5s linear" }}
          color="bg-violet-400"
        />

        <Pages
          className=""
          transTransi={`opacity-95 duration-[400ms]  ${!(activePage === 2) ? "translate-y-[74vh] delay-[200ms]" : "!translate-y-0 !duration-[500ms]"} ${!isHomeActive && activePage !== 2 ? "!translate-y-[91vh]" : "duration-[300ms]"}`}
          scaleTransi={`duration-[500ms] delay-50 ${!(activePage === 2) ? "scale-[53%]" : "scale-100 delay-[170ms]"}`}
          color="bg-red-400"
        />

        <Pages
          className=""
          transTransi={`opacity-95 duration-[300ms] ${!(activePage === 3) ? "translate-y-[78vh] delay-[200ms]" : "!translate-y-0 !duration-[500ms]"} ${!isHomeActive && activePage !== 3 ? "!translate-y-[92vh]" : "duration-[300ms]"}`}
          scaleTransi={`duration-[500ms] delay-50 ${!(activePage === 3) ? "scale-[56%]" : "scale-100 delay-[170ms]"}`}
          color="bg-orange-400"
        />

        <Pages
          className=""
          transTransi={`duration-[200ms] ${!(activePage === 4) ? "translate-y-[82vh] delay-[200ms]" : "!translate-y-0 !duration-[500ms]"} ${!isHomeActive && activePage !== 4 ? "!translate-y-[93vh]" : "duration-[300ms]"}`}
          scaleTransi={`duration-[500ms] delay-30 ${!(activePage === 4) ? "scale-[59%]" : "scale-100 delay-[170ms]"}`}
          color="bg-yellow-400"
        />

        <Pages
          className=""
          transTransi={`duration-[100ms] ${!(activePage === 5) ? "translate-y-[86vh] delay-[200ms]" : "!translate-y-0 !duration-[500ms]"} ${!isHomeActive && activePage !== 5 ? "!translate-y-[94vh]" : "duration-[300ms]"}`}
          scaleTransi={`duration-[500ms] delay-10 ${!(activePage === 5) ? "scale-[62%]" : "scale-100 delay-[170ms]"}`}
          color="bg-green-400"
        />
      </div>
    </div>
  );
}

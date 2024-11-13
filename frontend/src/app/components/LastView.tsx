"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export default function LastView({ pageActive }: { pageActive: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (pageActive) {
      // console.log("pageActive");
      videoRef.current?.load();
      // videoRef.current?.play();
    }
  });

  return (
    <div className="w-full h-[95%] flex items-center px-8 relative">
      <video
        className="w-full h-[90%] object-cover pointer-events-auto bottom-0"
        controls
        ref={videoRef}
      >
        <source src="/videos/HarvestHubv1.3.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <Image
        src="/images/fougere_downscaled.png"
        alt="Picture of the author"
        width={2000}
        height={2000}
        // className="w-96 transform rotate-[-68deg]"
        className="w-96 absolute scale-x-[-1] bottom-[-150px] transform rotate-[68deg] right-[-100px] z-[-1]"
      />
    </div>
  );
}

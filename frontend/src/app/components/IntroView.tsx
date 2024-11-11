"use client";

import Image from "next/image";

export default function IntroView() {
  return (
    <div className="w-full h-full">
      <div className="bg-white w-fit ml-8 mt-4 rounded-xl">
        <div>
          <Image
            src="/images/logo.png"
            alt="Picture of the author"
            width={300}
            height={300}
            className="w-96"
          />
          <Image
            src="/images/fougere.png"
            alt="Picture of the author"
            width={100}
            height={100}
            className="w-96 transform rotate-[-68deg]"
            // className="w-96 absolute bottom-[-10vh] transform rotate-[-68deg] left-[-40px]"
          />
        </div>
      </div>
    </div>
  );
}

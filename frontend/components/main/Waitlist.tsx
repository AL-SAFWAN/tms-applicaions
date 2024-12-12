"use client";
import React from "react";
import { BackgroundBeams } from "@/components/ui/background-beams";

export function BackgroundBeamsDemo() {
  return (
    <div className="min-h-[20rem] w-full rounded-md dark:bg-neutral-950 relative flex flex-col items-center justify-center antialiased ">
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="relative z-10 text-lg md:text-6xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-600 to-neutral-950 dark:from-neutral-200 dark:to-neutral-600  text-center font-sans font-bold">
          Follow Our Journey
        </h1>
        <p className="text-neutral-500  max-w-lg mx-auto my-2 text-sm text-center relative z-10">
          Stay updated on our latest progress and news
        </p>
        <input
          type="text"
          placeholder="hi@email.com"
          className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500  w-full relative z-10 mt-4  dark:bg-neutral-950 placeholder:text-neutral-700 p-2"
        />
      </div>
      {/* <BackgroundBeams /> */}
    </div>
  );
}

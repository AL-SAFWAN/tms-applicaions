import React from "react";
import { FlipWords } from "@/components/ui/flip-words";

export function FlipWordsDemo() {
  const words = ["Wrestling", "No-Gi", "Gi"];

  return (
    <div className=" flex justify-start items-center self-center  w-fit">
      <div className="text-4xl  font-normal text-neutral-600 dark:text-neutral-400 text-center">
        Learn
        <FlipWords words={words} /> <br />
        Reasons to Train at Legion
      </div>
    </div>
  );
}

import React from "react";
import { FlipWords } from "@/components/ui/flip-words";

export function FlipWordsDemo() {
  const words = ["Tickets", "Stress", "Time", "Money", "Effort"];

  return (
    <div className="flex w-fit items-center justify-start self-center">
      <div className="text-center text-4xl font-normal text-neutral-600 dark:text-neutral-400">
        Mange
        <FlipWords words={words} /> <br />
        Reasons to use TMS
      </div>
    </div>
  );
}

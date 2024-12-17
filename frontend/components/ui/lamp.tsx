"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { PlaceholdersAndVanishInput } from "./placeholders-and-vanish-input";
import Image from "next/image";

export function PlaceholdersAndVanishInputDemo() {
  const placeholders = [
    "Virtues of Fasting 'Ashura",
    "How To Start Your Business",
    "Heart Softeners ",
    "Waswas of Shaytan",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {};
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <div className="flex h-fit w-full -translate-y-48 flex-col items-center justify-center px-4">
      <h2 className="mb-10 text-center text-xl capitalize text-slate-950 dark:text-slate-200/80">
        search our courses and content
      </h2>
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default function LampDemo() {
  return (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text py-4 text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
      >
        Build lamps <br /> the right way
      </motion.h1>
    </LampContainer>
  );
}

export const LampContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative z-0 flex min-h-screen w-full flex-col items-center justify-center overflow-hidden rounded-md bg-neutral-50 dark:bg-neutral-950",
        className,
      )}
    >
      <div className="relative z-50 flex translate-y-40 flex-col items-center px-5">
        {children}
      </div>
      <div className="relative isolate z-0 flex w-full flex-1 -translate-y-28 rotate-180 scale-y-150 items-center justify-center">
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="bg-gradient-conic absolute inset-auto right-1/2 h-56 w-[30rem] overflow-visible from-slate-500 via-transparent to-transparent text-black [--conic-position:from_70deg_at_center_top] dark:from-white dark:via-transparent dark:to-transparent dark:text-white"
        >
          <div className="absolute bottom-0 left-0 z-20 h-40 w-[100%] bg-neutral-50 [mask-image:linear-gradient(to_top,white,transparent)] dark:bg-neutral-950" />
          <div className="absolute bottom-0 left-0 z-20 h-[100%] w-40 bg-neutral-50 [mask-image:linear-gradient(to_right,white,transparent)] dark:bg-neutral-950" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="bg-gradient-conic absolute inset-auto left-1/2 h-56 w-[30rem] from-transparent via-transparent to-slate-500 text-slate-500 [--conic-position:from_290deg_at_center_top] dark:to-white dark:text-white"
        >
          <div className="absolute bottom-0 right-0 z-20 h-[100%] w-40 bg-neutral-50 [mask-image:linear-gradient(to_left,white,transparent)] dark:bg-neutral-950" />
          <div className="absolute bottom-0 right-0 z-20 h-40 w-[100%] bg-neutral-50 [mask-image:linear-gradient(to_top,white,transparent)] dark:bg-neutral-950" />
        </motion.div>
        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-neutral-50 blur-2xl dark:bg-neutral-950"></div>
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
        <div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-slate-500 opacity-50 blur-3xl dark:bg-white"></div>
        <motion.div
          initial={{ width: "8rem" }}
          whileInView={{ width: "16rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full bg-slate-500 blur-2xl dark:bg-white"
        ></motion.div>
        <motion.div
          initial={{ width: "15rem" }}
          whileInView={{ width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem] bg-slate-500 dark:bg-white"
        ></motion.div>

        <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-neutral-50 dark:bg-neutral-950"></div>
      </div>
      {/* <PlaceholdersAndVanishInputDemo /> */}
    </div>
  );
};

import Link from "next/link";
import React from "react";
import { ModeToggle } from "@/components/main/Swtich";
import Image from "next/image";

function Navbar() {
  return (
    <header className="z-[100] flex w-full items-center justify-between border-foreground/10 bg-background/50 p-2 backdrop-blur-lg">
      <aside className="group flex items-center gap-[2px]">
        <Image
          className="m-2 size-11 object-contain invert dark:invert-0"
          src={"/logo.png"}
          width={250}
          height={200}
          alt="mufti menk"
        />
        <p className="text-xl font-bold tracking-tighter">
          Legion Grappling Academy
        </p>
      </aside>

      <aside className="z-0 flex items-center gap-4 p-2">
        <ModeToggle />
        <Link
          href="/signup"
          className="relative inline-flex h-10 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
        >
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#991526_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center text-nowrap rounded-full bg-background px-3 py-1 text-sm font-medium text-foreground backdrop-blur-3xl">
            Sign Up
          </span>
        </Link>
      </aside>
    </header>
  );
}

export default Navbar;

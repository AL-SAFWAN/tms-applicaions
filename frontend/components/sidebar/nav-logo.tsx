"use client";
import * as React from "react";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";

export function LegionHeader({}) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          {/* <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg bg-secondary"> */}
          <Image
            className="aspect-square size-10 object-contain p-1 invert hover:cursor-pointer dark:invert-0"
            src={"/logo.png"}
            width={250}
            height={200}
            alt="Legion Logo"
          />
          <div className="flex flex-col gap-0.5 leading-none">
            <span className="font-bold">Legion</span>
            <span>Grappling Academy</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

"use client";
import * as React from "react";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { TicketIcon } from "lucide-react";

export function TMSHeader({}) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          {/* <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg bg-secondary"> */}
          {/* <Image
            className="aspect-square size-10 object-contain p-1 invert hover:cursor-pointer dark:invert-0"
            src={"/logo.png"}
            width={250}
            height={200}
            alt="Legion Logo"
          /> */}

          <TicketIcon className="!size-7 pl-1 text-secondary-foreground/70 hover:cursor-pointer hover:text-secondary-foreground/100" />
          <span className="font-bold">TMS</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

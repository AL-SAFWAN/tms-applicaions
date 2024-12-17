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
          <TicketIcon className="!size-7 pl-1 text-secondary-foreground/70 hover:cursor-pointer hover:text-secondary-foreground/100" />
          <span className="font-bold">TMS</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

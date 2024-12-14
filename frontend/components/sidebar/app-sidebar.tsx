"use client";
import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  CalendarDays,
  Command,
  GalleryVerticalEnd,
  Home,
  LibraryBig,
  ListVideo,
  Play,
  User2,
  Users,
} from "lucide-react";
import { NavMain } from "./nav-main";
import { NavAdmin } from "./nav-projects";
import { NavUser } from "./nav-users";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { TMSHeader } from "./nav-logo";
// This is sample data.
const data = {
  navMain: [
    {
      title: "Home",
      url: "/",
      icon: Home,
      isActive: true,
      // items: [
      //   {
      //     title: "History",
      //     url: "#",
      //   },
      //   {
      //     title: "Starred",
      //     url: "#",
      //   },
      //   {
      //     title: "Settings",
      //     url: "#",
      //   },
      // ],
    },
    {
      title: "Profile",
      url: "/profile",
      icon: User2,
    },
    // {
    //   title: "My Learning",
    //   url: "/learning",
    //   icon: BookOpen,
    //   //   items: [
    //   //     {
    //   //       title: "Wrestling",
    //   //       url: "#",
    //   //     },
    //   //     {
    //   //       title: "Bjj",
    //   //       url: "#",
    //   //     },
    //   //   ],
    // },
    // {
    //   title: "Course",
    //   url: "/courses",
    //   icon: Play,
    //   // items: [
    //   //   {
    //   //     title: "General",
    //   //     url: "#",
    //   //   },
    //   //   {
    //   //     title: "Team",
    //   //     url: "#",
    //   //   },
    //   //   {
    //   //     title: "Billing",
    //   //     url: "#",
    //   //   },
    //   //   {
    //   //     title: "Limits",
    //   //     url: "#",
    //   //   },
    //   // ],
    // },
    // {
    //   title: "Videos",
    //   url: "/videos",
    //   icon: LibraryBig,
    // },
    // {
    //   title: "Events",
    //   url: "/calendar",
    //   icon: CalendarDays,
    // },
    // {
    //   title: "Progress",
    //   url: "/progress",
    //   icon: ListVideo,
    //   items: [
    //     {
    //       title: "Wrestling",
    //       url: "/courses/1",
    //     },
    //     {
    //       title: "Bjj",
    //       url: "#",
    //     },
    // ],
    // },
  ],
  projects: [
    {
      title: "Users Management",
      url: "/users",
      icon: Users,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TMSHeader />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavAdmin items={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />{" "}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

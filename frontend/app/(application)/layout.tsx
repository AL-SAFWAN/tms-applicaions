import type { Metadata } from "next";
// import GridPanel from "@/components/PanelLayout"; [TODO remove from app]
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";

import Header from "@/components/sidebar/nav-breadcrumb";

export const metadata: Metadata = {
  title: "TMS App",
  description: "TMS Web App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="min-w-0">
        <Header />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}

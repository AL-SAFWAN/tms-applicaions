"use client";

import * as React from "react";
import { Ghost, Link, LogOut, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useLogoutMutation } from "@/hooks/auth";

interface Props {
  isCollapsed: boolean;
}

export function ModeToggleMenu() {
  const { theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Avoid hydration mismatch
  }

  return (
    <>
      {theme === "dark" ? <Sun /> : <Moon />}
      <span>{theme}</span>
    </>
  );
}

export function LogoutMenu({ isCollapsed }: Props) {
  const [mounted, setMounted] = React.useState(false);
  const router = useRouter();
  const logout = useLogoutMutation();
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Avoid hydration mismatch
  }

  return (
    <div
      data-collapsed={isCollapsed}
      className="group -mb-2 mt-2"
      onClick={() => logout.mutate()}
    >
      <nav className="group-data-[collapsed=true]:justify-left grid gap-1 px-1 hover:cursor-pointer group-data-[collapsed=true]:px-0">
        {isCollapsed ? (
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <div
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "h-9 w-9",
                )}
              >
                <LogOut className="size-4" />
              </div>
            </TooltipTrigger>
            <TooltipContent side="right" className="flex items-center gap-4">
              Log Out
            </TooltipContent>
          </Tooltip>
        ) : (
          <div
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "flex h-fit w-full flex-col items-start p-2",
            )}
          >
            <div className="flex w-full items-center">
              <LogOut className="size-4" />
              <span className={cn("ml-2 capitalize")}>Log Out</span>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Avoid hydration mismatch
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return (
    <Button variant="link" size="icon" onClick={toggleTheme}>
      {theme === "dark" ? (
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

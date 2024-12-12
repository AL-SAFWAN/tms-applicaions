"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

interface BaseProps {
  children: React.ReactNode;
}

interface RootOverlayProps extends BaseProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface OverlayProps extends BaseProps {
  className?: string;
  asChild?: true;
}

const desktop = "(min-width: 768px)";

const Overlay = ({ children, ...props }: RootOverlayProps) => {
  const isDesktop = useMediaQuery(desktop);
  const Overlay = isDesktop ? Dialog : Drawer;

  return <Overlay {...props}>{children}</Overlay>;
};

const OverlayTrigger = ({ className, children, ...props }: OverlayProps) => {
  const isDesktop = useMediaQuery(desktop);
  const OverlayTrigger = isDesktop ? DialogTrigger : DrawerTrigger;

  return (
    <OverlayTrigger className={className} {...props}>
      {children}
    </OverlayTrigger>
  );
};

const OverlayClose = ({ className, children, ...props }: OverlayProps) => {
  const isDesktop = useMediaQuery(desktop);
  const OverlayClose = isDesktop ? DialogClose : DrawerClose;

  return (
    <OverlayClose className={className} {...props}>
      {children}
    </OverlayClose>
  );
};

const OverlayContent = ({ className, children, ...props }: OverlayProps) => {
  const isDesktop = useMediaQuery(desktop);
  const OverlayContent = isDesktop ? DialogContent : DrawerContent;

  return (
    <OverlayContent className={cn("md:max-w-[425px]", className)} {...props}>
      {children}
    </OverlayContent>
  );
};

const OverlayDescription = ({
  className,
  children,
  ...props
}: OverlayProps) => {
  const isDesktop = useMediaQuery(desktop);
  const OverlayDescription = isDesktop ? DialogDescription : DrawerDescription;

  return (
    <OverlayDescription className={className} {...props}>
      {children}
    </OverlayDescription>
  );
};

const OverlayHeader = ({ className, children, ...props }: OverlayProps) => {
  const isDesktop = useMediaQuery(desktop);
  const OverlayHeader = isDesktop ? DialogHeader : DrawerHeader;

  return (
    <OverlayHeader className={className} {...props}>
      {children}
    </OverlayHeader>
  );
};

const OverlayTitle = ({ className, children, ...props }: OverlayProps) => {
  const isDesktop = useMediaQuery(desktop);
  const OverlayTitle = isDesktop ? DialogTitle : DrawerTitle;

  return (
    <OverlayTitle className={className} {...props}>
      {children}
    </OverlayTitle>
  );
};

const OverlayBody = ({ className, children, ...props }: OverlayProps) => {
  return (
    <div className={cn("px-4 md:px-0", className)} {...props}>
      {children}
    </div>
  );
};

const OverlayFooter = ({ className, children, ...props }: OverlayProps) => {
  const isDesktop = useMediaQuery(desktop);
  const OverlayFooter = isDesktop ? DialogFooter : DrawerFooter;

  return (
    <OverlayFooter className={className} {...props}>
      {children}
    </OverlayFooter>
  );
};

export {
  Overlay,
  OverlayTrigger,
  OverlayClose,
  OverlayContent,
  OverlayDescription,
  OverlayHeader,
  OverlayTitle,
  OverlayBody,
  OverlayFooter,
};

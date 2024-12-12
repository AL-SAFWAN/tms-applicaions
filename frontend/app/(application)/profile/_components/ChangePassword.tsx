import React, { useState } from "react";
import {
  Overlay,
  OverlayContent,
  OverlayHeader,
  OverlayTitle,
  OverlayTrigger,
} from "@/components/ui/overlay";
import { Button } from "@/components/ui/button";
import { Key } from "lucide-react";
import { User } from "@/schemas/authSchema";
import PasswordForm from "./PasswordForm";

const ChangePasswordOverlay = ({ user }: { user: User }) => {
  const [open, setOpen] = useState(false);
  return (
    <Overlay open={open} onOpenChange={setOpen}>
      <OverlayTrigger asChild className="ml-2">
        <Button variant="outline" size={"sm"}>
          <Key />
          Update Password
        </Button>
      </OverlayTrigger>
      <OverlayContent>
        <OverlayHeader>
          <OverlayTitle>Update Password</OverlayTitle>
        </OverlayHeader>
        <PasswordForm closeOverlay={() => setOpen(false)} />
      </OverlayContent>
    </Overlay>
  );
};
ChangePasswordOverlay.displayName = "ChangePasswordOverlay";
export default ChangePasswordOverlay;

import React, { useState } from "react";
import {
  Overlay,
  OverlayContent,
  OverlayHeader,
  OverlayTitle,
  OverlayTrigger,
} from "@/components/ui/overlay";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import EditForm from "./EditForm";
import { User } from "@/schemas/authSchema";

const EditProfileOverlay = ({ user }: { user: User }) => {
  const [open, setOpen] = useState(false);
  return (
    <Overlay open={open} onOpenChange={setOpen}>
      <OverlayTrigger asChild className="mb-2">
        <Button variant="outline" size={"sm"}>
          <Edit />
          Edit Profile
        </Button>
      </OverlayTrigger>
      <OverlayContent>
        <OverlayHeader>
          <OverlayTitle>Edit Profile</OverlayTitle>
        </OverlayHeader>
      </OverlayContent>
    </Overlay>
  );
};
EditProfileOverlay.displayName = "EditProfileOverlay";
export default EditProfileOverlay;

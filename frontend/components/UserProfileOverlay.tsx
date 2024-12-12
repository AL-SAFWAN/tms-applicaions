"use client";
import { Button } from "@/components/ui/button";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Medal,
  Weight,
  Ruler,
  User,
  Dumbbell,
  Award,
  BadgeCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUser } from "@/hooks/auth";
import {
  Overlay,
  OverlayContent,
  OverlayFooter,
  OverlayHeader,
  OverlayTitle,
  OverlayTrigger,
} from "./ui/overlay";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";

interface Props {
  isCollapsed: boolean;
}

export default function UserProfileMenuItem() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useUser();
  return (
    <Overlay open={isOpen} onOpenChange={setIsOpen}>
      <OverlayTrigger asChild>
        <DropdownMenuItem
          onClick={(e) => {
            e.preventDefault();
            setIsOpen(true);
          }}
          className={cn(
            "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0",
          )}
        >
          <BadgeCheck />
          Account
        </DropdownMenuItem>
      </OverlayTrigger>
      <OverlayContent>
        <OverlayHeader>
          <OverlayTitle className="flex items-center gap-4">
            <Avatar className="size-11">
              <AvatarImage src={"/"} alt={data?.firstName} />
              <AvatarFallback>
                {data?.firstName[0]}
                {data?.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="space-x-1 text-xl font-semibold">
                <span>{data?.firstName}</span>
                <span>{data?.lastName}</span>
              </p>
              <p className="text-sm text-muted-foreground">
                Member since {data?.createdAt?.toLocaleDateString()}
              </p>
            </div>
          </OverlayTitle>
        </OverlayHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{data?.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Age: {data?.age} </span>
          </div>
          <div className="flex items-center gap-2">
            <Weight className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Weight: {data?.weight} kg</span>
          </div>
          <div className="flex items-center gap-2">
            <Ruler className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Height: {data?.height} cm</span>
          </div>
          <div className="flex flex-row flex-wrap gap-1">
            <h3 className="flex items-center gap-2 text-sm">
              <Award className="h-4 w-4 text-muted-foreground" />
              Ranking:
            </h3>
            <div className="flex w-fit space-x-1">
              <Badge variant="secondary">{data?.beltLevel} Belt</Badge>
              <Badge variant="secondary">{data?.awardLevel} Award</Badge>
            </div>
          </div>
          {/* <div>
            <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold">
              <Dumbbell className="h-4 w-4" />
              Competition Record
            </h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-muted-foreground">BJJ</p>
                <p>
                  Wins: {user.competitionRecord.bjj.wins} / Losses:{" "}
                  {user.competitionRecord.bjj.losses}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Wrestling</p>
                <p>
                  Wins: {user.competitionRecord.wrestling.wins} / Losses:{" "}
                  {user.competitionRecord.wrestling.losses}
                </p>
              </div>
            </div>
          </div> */}
        </div>
        <OverlayFooter>
          <Button
            onClick={() => {
              setIsOpen(false);
              router.push("/profile");
            }}
          >
            Edit in Profile
          </Button>
        </OverlayFooter>
      </OverlayContent>
    </Overlay>
  );
}

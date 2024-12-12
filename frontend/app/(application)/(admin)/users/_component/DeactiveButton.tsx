import { useUpdateUsersMutation } from "@/hooks/users";
import { User } from "@/schemas/authSchema";
import { Row } from "@tanstack/react-table";
import { PauseCircle, PlayCircle } from "lucide-react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

import { toast } from "sonner";

export function DeactivateButton({ row }: { row: Row<User> }) {
  const updateUser = useUpdateUsersMutation();
  const handleDeactivateUser = (userId: string, isActive: boolean) => {
    updateUser.mutate({ id: userId, data: { isActive } });
  };

  useEffect(() => {
    if (updateUser.isError) {
      toast.error("Error", {
        className:
          "!border-2 border-destructive text-destructive-foreground  bg-destructive/90 text-destructive-foreground [&>svg]:text-destructive ",
        description: updateUser.error?.message,
        duration: 2500,
      });
    }
  }, [updateUser.isError]);

  return (
    <Button
      variant="ghost"
      size="xs"
      disabled={updateUser.isPending}
      onClick={() =>
        handleDeactivateUser(row.original.id, !row.original.isActive)
      }
    >
      {row.original.isActive ? (
        <PauseCircle className="size-4" />
      ) : (
        <PlayCircle className="size-4" />
      )}
    </Button>
  );
}

import { Button, buttonVariants } from "@/components/ui/button";
import { useDeleteUserMutation } from "@/hooks/users";
import { cn } from "@/lib/utils";
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
import { Trash2 } from "lucide-react";
import { Row } from "@tanstack/react-table";
import { User } from "@/schemas/authSchema";
import { ErrorAlert } from "@/components/ui/alert";

export function DeleteDialog({ row }: { row: Row<User> }) {
  const deleteUser = useDeleteUserMutation();
  const handleDeleteUser = () => {
    deleteUser.mutate(row.original.id);
  };

  return (
    <Dialog>
      <DialogTrigger
        className={cn(buttonVariants({ variant: "ghost", size: "xs" }))}
        disabled={deleteUser.isPending}
      >
        <Trash2 className="size-4" />
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>

          <DialogDescription>
            This action cannot be undone. This will permanently delete
            <span className="font-black"> {row.original.email}</span>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              No
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              type="button"
              variant={"destructive"}
              onClick={(e) => {
                // e.preventDefault();
                handleDeleteUser();
              }}
            >
              {deleteUser.isError ? "Try Again" : "Yes"}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

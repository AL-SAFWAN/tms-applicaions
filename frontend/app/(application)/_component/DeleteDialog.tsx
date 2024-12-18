import { Button, buttonVariants } from "@/components/ui/button";
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
import { useDeleteTicketMutation } from "@/hooks/use-tickets";
import { Ticket } from "@/schemas/ticketsSchema";

export function DeleteDialog({ row }: { row: Row<Ticket> }) {
  const deleteTicket = useDeleteTicketMutation();
  const handleDeleteTicket = () => {
    deleteTicket.mutate(row.original.id);
  };

  return (
    <Dialog>
      <DialogTrigger
        className={cn(buttonVariants({ variant: "ghost", size: "xs" }))}
        disabled={deleteTicket.isPending}
      >
        <Trash2 className="size-4" />
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>

          <DialogDescription>
            This action cannot be undone. This will permanently delete
            <span className="font-black"> {row.original.title}</span>
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
                handleDeleteTicket();
              }}
            >
              {deleteTicket.isError ? "Try Again" : "Yes"}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

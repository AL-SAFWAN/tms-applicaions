"use client";

import { Input } from "@/components/ui/input";
import { Label, LabelInputContainer } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ErrorAlert } from "@/components/ui/alert";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormEvent, useEffect } from "react";
import {
  ticketCreateSchema,
  TicketCreateInputs,
  PriorityEnum,
} from "@/schemas/ticketsSchema";
import { useCreateTicketMutation } from "@/hooks/use-tickets";

export function TicketForm({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const createTicket = useCreateTicketMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<TicketCreateInputs>({
    resolver: zodResolver(ticketCreateSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: PriorityEnum.medium,
    },
  });

  const onSubmit = (data: TicketCreateInputs) => {
    createTicket.mutate(data);
  };

  function onReset(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    reset();
    createTicket.reset();
  }

  useEffect(() => {
    if (createTicket.isSuccess) {
      // Close the form modal/drawer if needed
      setOpen(false);
    }
  }, [createTicket.isSuccess]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} onReset={onReset}>
      <ErrorAlert
        isError={createTicket.isError}
        error={createTicket.error}
        className={"mb-4 mt-4"}
      />

      <div className="flex flex-col space-y-4 pt-4">
        <LabelInputContainer>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            type="text"
            {...register("title")}
            error={errors.title}
          />
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            type="text"
            {...register("description")}
            error={errors.description}
          />
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="priority">Priority</Label>
          <select
            id="priority"
            {...register("priority")}
            className="rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
          >
            <option value={PriorityEnum.low}>Low</option>
            <option value={PriorityEnum.medium}>Medium</option>
            <option value={PriorityEnum.high}>High</option>
          </select>
          {errors.priority && (
            <p className="text-sm text-red-500">{errors.priority.message}</p>
          )}
        </LabelInputContainer>

        <div className="flex w-full space-x-4 pt-8 md:w-fit md:items-center md:self-end">
          <Button
            type="reset"
            variant={"secondary"}
            disabled={!isDirty}
            className="w-full md:w-fit"
          >
            Reset
          </Button>
          <Button type="submit" disabled={!isDirty} className="w-full md:w-fit">
            Create Ticket
          </Button>
        </div>
      </div>
    </form>
  );
}

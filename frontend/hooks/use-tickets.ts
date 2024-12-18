"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchTickets,
  fetchTicketById,
  createTicket,
  updateTicket,
  deleteTicket,
} from "./fetchers/tickets";

export const useTickets = () => {
  return useQuery({
    queryKey: ["tickets"],
    queryFn: fetchTickets,
  });
};

export const useTicket = (id: number) => {
  return useQuery({
    queryKey: ["tickets", id],
    queryFn: () => fetchTicketById(id),
  });
};

export const useCreateTicketMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["createTicket"],
    mutationFn: createTicket,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
    },
  });
};

export const useUpdateTicketMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["updateTicket"],
    mutationFn: updateTicket,
    onSuccess: (newData, variables) => {
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
      queryClient.invalidateQueries({ queryKey: ["tickets", variables.id] });
    },
  });
};

export const useDeleteTicketMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteTicket"],
    mutationFn: deleteTicket,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
    },
  });
};

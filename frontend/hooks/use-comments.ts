import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchCommentsByTicketId,
  createComment,
  updateComment,
  deleteComment,
} from "./fetchers/comments";

export const useComments = (ticketId: number) => {
  return useQuery({
    queryKey: ["comments", ticketId],
    queryFn: () => fetchCommentsByTicketId(ticketId),
    staleTime: 1000 * 60 * 5,
  });
};

export const useCreateCommentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createComment,
    onSuccess: (data, variables) => {
      // variables.ticketId is available here
      queryClient.invalidateQueries({
        queryKey: ["comments", variables.ticketId],
      });
    },
  });
};

export const useUpdateCommentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateComment,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      //   TODO
      //   (Adjust UpdateCommentVariables to include ticketId if needed)
      //   queryClient.invalidateQueries({ queryKey: ["comments", variables.ticketId] });
    },
  });
};

export const useDeleteCommentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteComment,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      //   queryClient.invalidateQueries({ queryKey: ["comments", variables.ticketId] });
    },
  });
};

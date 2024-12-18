import clientFetcher from "@/fetcher/client.fetcher";

import {
  CommentCreateInputs,
  CommentPublic,
  CommentUpdateInputs,
} from "@/schemas/commentsSchema";

export const fetchCommentsByTicketId = async (
  ticketId: number,
): Promise<CommentPublic[]> => {
  return clientFetcher(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tickets/${ticketId}/comments`,
  );
};

export const createComment = async ({
  ticketId,
  data,
}: {
  ticketId: number;
  data: CommentCreateInputs;
}): Promise<CommentPublic> => {
  return clientFetcher(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tickets/${ticketId}/comments`,
    {
      method: "POST",
      body: data,
    },
  );
};

export const updateComment = async ({
  commentId,
  data,
}: {
  commentId: number;
  data: CommentUpdateInputs;
}): Promise<CommentPublic> => {
  return clientFetcher(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tickets/comments/${commentId}`,
    {
      method: "PATCH",
      body: data,
    },
  );
};

export const deleteComment = async (commentId: number): Promise<void> => {
  return clientFetcher(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tickets/comments/${commentId}`,
    {
      method: "DELETE",
    },
  );
};

import { z } from "zod";
import { BasicUserPublicSchema } from "./userSchema";

export const commentCreateSchema = z.object({
  content: z.string().max(255).min(1),
});

export type CommentCreateInputs = z.infer<typeof commentCreateSchema>;

export const commentUpdateSchema = z.object({
  content: z.string().max(255).min(1).optional(),
});

export type CommentUpdateInputs = z.infer<typeof commentUpdateSchema>;

export const commentPublicSchema = z.object({
  id: z.number(),
  content: z.string(),
  author: BasicUserPublicSchema,
  created_at: z.string().transform((val) => new Date(val)), // convert to Date object
});

export type CommentPublic = z.infer<typeof commentPublicSchema>;

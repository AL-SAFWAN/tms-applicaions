import { z } from "zod";
import { BasicUserPublicSchema } from "./userSchema";

export enum StatusEnum {
  open = "open",
  inProgress = "in_progress",
  resolved = "resolved",
  closed = "closed",
}

export enum PriorityEnum {
  low = "low",
  medium = "medium",
  high = "high",
}

// Ticket Schemas
export const ticketCreateSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().max(255).optional().default(""),
  priority: z.nativeEnum(PriorityEnum).optional().default(PriorityEnum.medium),
  status: z.nativeEnum(StatusEnum).optional().default(StatusEnum.open),
});

export type TicketCreateInputs = z.infer<typeof ticketCreateSchema>;

export const ticketUpdateSchema = z.object({
  title: z.string().min(1).max(255).optional(),
  description: z.string().max(255).optional(),
  priority: z.nativeEnum(PriorityEnum).optional(),
  status: z.nativeEnum(StatusEnum).optional(),
  assigned_agent_id: z.string().uuid().optional(),
  resolved_at: z.string().datetime().optional(),
});

export type TicketUpdateInputs = z.infer<typeof ticketUpdateSchema>;

export const ticketPublicSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  priority: z.nativeEnum(PriorityEnum),
  status: z.nativeEnum(StatusEnum),
  createdAt: z.string(), // convert to Date
  resolvedAt: z.string().optional(), // convert to Date
  requester: BasicUserPublicSchema.optional(),
  assigned_agent: BasicUserPublicSchema.optional(),
});

export type Ticket = z.infer<typeof ticketPublicSchema>;

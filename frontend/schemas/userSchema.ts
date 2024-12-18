import { z } from "zod";
import { roleEnum } from "./authSchema";

export const BasicUserPublicSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
});
// TODO remove this
export const UserUpdateSchema = z.object({
  email: z.string().email("Invalid email address").optional(),
  firstName: z.string().min(1, "First name is required").optional(),
  lastName: z.string().min(1, "Last name is required ").optional(),
});

export type UserUpdateInputs = z.infer<typeof UserUpdateSchema>;

export const PasswordUpdateSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long"),
    currentPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type PasswordUpdateInputs = z.infer<typeof PasswordUpdateSchema>;

export const createUserSchema = z.object({
  email: z.string().email("Invalid email address"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required "),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .optional(),
  role: z.nativeEnum(roleEnum, {
    errorMap: () => {
      return { message: "Please select a role" };
    },
  }),
  isActive: z.boolean().optional(),
});

export type createUserInputs = z.infer<typeof createUserSchema>;

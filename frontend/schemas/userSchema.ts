import { z } from "zod";
import { awardEnum, beltEnum, roleEnum } from "./authSchema";

export const UserUpdateSchema = z.object({
  email: z.string().email("Invalid email address").optional(),
  firstName: z.string().min(1, "First name is required").optional(),
  lastName: z.string().min(1, "Last name is required ").optional(),
  weight: z.coerce.number().optional(),
  height: z.string().optional(),
  address: z.string().optional(),
  dateOfBirth: z
    .string({
      required_error: "Date is required",
    })
    .nullable(),
});

export type UserUpdateInputs = z.infer<typeof UserUpdateSchema>;

export const EmergencyInfoUpdateSchema = z.object({
  emergencyContactName: z.string().optional(),
  emergencyContactRelationship: z.string().optional(),
  emergencyContactPhone: z.string().optional(),
  allergies: z.string().optional(),
  medications: z.string().optional(),
  medicalConditions: z.string().optional(),
});

export type EmergencyInfoUpdateInputs = z.infer<
  typeof EmergencyInfoUpdateSchema
>;
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
  weight: z.coerce.number().optional(),
  height: z.string().optional(),
  address: z.string().optional(),
  role: z.nativeEnum(roleEnum, {
    errorMap: () => {
      return { message: "Please select a role" };
    },
  }),
  beltLevel: z.nativeEnum(beltEnum, {
    errorMap: () => {
      return { message: "Please select a belt" };
    },
  }),
  awardLevel: z.nativeEnum(awardEnum).optional(),
  isActive: z.boolean().optional(),
  dateOfBirth: z.string({
    errorMap: () => ({ message: "Birth date is required" }),
  }),
  emergencyContactName: z.string().optional(),
  emergencyContactRelationship: z.string().optional(),
  emergencyContactPhone: z.string().optional(),
  allergies: z.string().optional(),
  medications: z.string().optional(),
  medicalConditions: z.string().optional(),
});

export type createUserInputs = z.infer<typeof createUserSchema>;

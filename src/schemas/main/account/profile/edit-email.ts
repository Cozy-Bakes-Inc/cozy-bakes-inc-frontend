import { z } from "zod";

export const editEmailSchema = z.object({
  new_email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email"),
});

export const verifyEditEmailSchema = z.object({
  otp: z
    .string()
    .trim()
    .min(5, "Verification code must be 5 digits")
    .max(5, "Verification code must be 5 digits"),
  new_email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email"),
});

export type EditEmailSchemaValues = z.infer<typeof editEmailSchema>;
export type VerifyEditEmailSchemaValues = z.infer<typeof verifyEditEmailSchema>;

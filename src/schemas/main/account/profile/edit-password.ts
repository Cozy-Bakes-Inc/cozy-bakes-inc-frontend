import { z } from "zod";

export const editPasswordSchema = z
  .object({
    old_password: z
      .string()
      .min(1, "Current password is required")
      .min(8, "Current password must be at least 8 characters"),
    new_password: z
      .string()
      .min(1, "New password is required")
      .min(8, "Password must be at least 8 characters"),
    new_password_confirmation: z
      .string()
      .min(1, "Confirm password is required"),
  })
  .refine((data) => data.new_password === data.new_password_confirmation, {
    message: "Passwords do not match",
    path: ["new_password_confirmation"],
  });

export type EditPasswordSchemaValues = z.infer<typeof editPasswordSchema>;

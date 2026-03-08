import { z } from "zod";

export const signUpFieldsSchema = z.object({
  first_name: z.string().trim().min(1, "First name is required"),
  last_name: z.string().trim().min(1, "Last name is required"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
  password_confirmation: z
    .string()
    .min(1, "Confirm password is required")
    .min(6, "Password must be at least 6 characters"),
});

export const signUpSchema = signUpFieldsSchema.refine(
  (data) => data.password === data.password_confirmation,
  {
    path: ["password_confirmation"],
    message: "Passwords do not match",
  },
);

export type SignUpSchemaValues = z.infer<typeof signUpSchema>;

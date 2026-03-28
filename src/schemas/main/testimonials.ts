import { z } from "zod";

export const testimonialsSchema = z.object({
  rating: z
    .number()
    .min(1, "Rating is required")
    .max(5, "Rating must be between 1 and 5"),
  review_text: z
    .string()
    .trim()
    .min(1, "Review text is required")
    .max(1000, "Review text is too long"),
});

export type TestimonialsSchemaValues = z.infer<typeof testimonialsSchema>;

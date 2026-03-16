import { z } from "zod";

export const editPersonalInformationSchema = z.object({
  first_name: z.string().trim().min(1, "First name is required"),
  last_name: z.string().trim().min(1, "Last name is required"),
});

export type EditPersonalInformationSchemaValues = z.infer<
  typeof editPersonalInformationSchema
>;

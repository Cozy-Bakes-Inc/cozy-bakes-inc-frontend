import { z } from "zod";

export const shippingInformationSchema = z.object({
  first_name: z.string().trim().min(1, "First name is required"),
  last_name: z.string().trim().min(1, "Last name is required"),
  phone_number: z.string().trim().min(1, "Phone number is required"),
  apt_villa: z.string().trim().min(1, "Apt / Villa is required"),
  building_cluster: z
    .string()
    .trim()
    .min(1, "Building / Cluster name is required"),
  street_landmark: z.string().trim().optional(),
  latitude: z.string().trim().min(1, "Latitude is required"),
  longitude: z.string().trim().min(1, "Longitude is required"),
});

export const receiverDetailsSchema = z.object({
  first_name: z.string().trim().min(1, "First name is required"),
  last_name: z.string().trim().min(1, "Last name is required"),
  phone_number: z.string().trim().min(1, "Phone number is required"),
});

export type ShippingInformationSchemaValues = z.infer<
  typeof shippingInformationSchema
>;

export type ReceiverDetailsSchemaValues = z.infer<
  typeof receiverDetailsSchema
>;

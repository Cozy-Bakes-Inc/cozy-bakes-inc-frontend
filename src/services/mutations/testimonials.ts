"use server";

import { type TestimonialsSchemaValues } from "@/schemas/main";
import { safeApi } from "..";

export const reviewAPI = async (payload: TestimonialsSchemaValues) =>
  await safeApi("POST", "/review/create", payload);

export const productReviewAPI = async (
  productSlug: string,
  payload: TestimonialsSchemaValues,
) => await safeApi("POST", `/product-review/${productSlug}/create`, payload);

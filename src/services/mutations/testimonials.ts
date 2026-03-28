"use server";

import { type TestimonialsSchemaValues } from "@/schemas/main";
import { safeApi } from "..";

export const reviewAPI = async (payload: TestimonialsSchemaValues) =>
  await safeApi("POST", "/review/create", payload);

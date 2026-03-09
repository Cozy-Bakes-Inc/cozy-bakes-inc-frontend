"use server";

import { type ContactSchemaValues } from "@/schemas/main";
import { safeApi } from "..";

export const contactAPI = async (payload: ContactSchemaValues) =>
  await safeApi("POST", "/contact/send-message", payload);

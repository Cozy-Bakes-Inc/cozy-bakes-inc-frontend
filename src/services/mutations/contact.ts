"use server";

import { safeApi } from "..";

export const contactAPI = async (payload: unknown) =>
  await safeApi("POST", "/contact/send-message", payload);

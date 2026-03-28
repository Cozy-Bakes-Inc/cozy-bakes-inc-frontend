"use server";

import { safeApi } from "@/services";

export const cancelOrderAPI = async (orderNumber: string) =>
  await safeApi("POST", `/order/${orderNumber}/cancel`);

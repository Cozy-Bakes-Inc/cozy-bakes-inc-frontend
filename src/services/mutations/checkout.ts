"use server";

import { CheckoutApiResponse } from "@/interfaces";
import { CheckoutSchemaValues } from "@/schemas";
import { safeApi } from "..";

export const checkoutAPI = async (payload: CheckoutSchemaValues) =>
  await safeApi<CheckoutApiResponse>("POST", "/cart/checkout", payload);

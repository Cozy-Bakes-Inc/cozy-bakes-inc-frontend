"use server";

import {
  CheckoutApiResponse,
  DeliveryFeePayload,
  ShippingFeeApiResponse,
} from "@/interfaces";
import { CheckoutSchemaValues } from "@/schemas";
import { safeApi } from "..";

export const listDeliveryFee = async (payload: DeliveryFeePayload) =>
  await safeApi<ShippingFeeApiResponse>("POST", "/delivery-fee/list", payload);

export const checkoutAPI = async (payload: CheckoutSchemaValues) =>
  await safeApi<CheckoutApiResponse>("POST", "/cart/checkout", payload);

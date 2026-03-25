"use server";

import {
  ReceiverDetailsSchemaValues,
  ShippingInformationSchemaValues,
} from "@/schemas/main/account";
import { safeApi } from "@/services";

export const updateShippingInformationAPI = async (
  payload: ShippingInformationSchemaValues,
) => await safeApi("POST", "/user/profile/update-shipping-data", payload);

export const updateReceiverDetailsAPI = async (
  payload: ReceiverDetailsSchemaValues,
) => await safeApi("POST", "/user/profile/update-receiver-details", payload);

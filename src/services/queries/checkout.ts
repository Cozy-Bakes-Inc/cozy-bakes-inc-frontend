import type { ShippingFeeApiResponse } from "@/interfaces";
import { baseAPI } from "..";

export const shippingFeeAPI = async () =>
  await baseAPI<ShippingFeeApiResponse>("GET", "/delivery-fee/list");

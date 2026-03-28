import { shippingFeeAPI } from "@/services/queries/checkout";
import { useCustomQuery } from "../useCustomQuery";

export function useShippingFee(isDelivery: boolean = true) {
  return useCustomQuery(["shippingFee"], shippingFeeAPI, {
    enabled: isDelivery,
  });
}

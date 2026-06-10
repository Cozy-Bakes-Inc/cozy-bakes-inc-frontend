"use client";

import { useEffect } from "react";
import { listDeliveryFee } from "@/services/mutations/checkout";
import { useCartStore } from "@/store/cart-store";
import { useDeliveryPickupModalStore } from "@/store/delivery-pickup-modal-store";
import { useCustomMutation } from "../useCustomMutation";

export function useShippingFee(isDelivery: boolean = true) {
  const cartItems = useCartStore((state) => state.items);
  const setShippingFeeData = useDeliveryPickupModalStore(
    (state) => state.setShippingFeeData,
  );
  console.log(cartItems);
  const setShippingFeeError = useDeliveryPickupModalStore(
    (state) => state.setShippingFeeError,
  );

  const { isPending, mutate } = useCustomMutation(listDeliveryFee, {
    onSuccess: (result) => {
      if (result.ok && result.data) {
        setShippingFeeData(result.data);
        setShippingFeeError(null);
      } else {
        setShippingFeeData(null);
        setShippingFeeError(
          result.message ?? "Unable to calculate shipping fee.",
        );
      }
    },
  });

  useEffect(() => {
    if (!isDelivery) return;
    const validItems = cartItems.filter(
      (item): item is typeof item & { slug: string; price_id: number } =>
        !!item.slug && item.price_id != null,
    );
    if (!validItems.length) return;
    mutate({
      items: validItems.map((item) => ({
        product_slug: item.slug,
        price_id: item.price_id,
        quantity: item.flavors
          ? Object.values(item.flavors).reduce((a, b) => a + b, 0)
          : item.quantity,
      })),
    });
  }, [isDelivery, cartItems, mutate]);

  const shippingFeeData = useDeliveryPickupModalStore(
    (state) => state.shippingFeeData,
  );
  const shippingFeeError = useDeliveryPickupModalStore(
    (state) => state.shippingFeeError,
  );

  const errorMessage = !isPending ? shippingFeeError : undefined;

  return { isLoading: isPending, errorMessage, shippingFeeData };
}

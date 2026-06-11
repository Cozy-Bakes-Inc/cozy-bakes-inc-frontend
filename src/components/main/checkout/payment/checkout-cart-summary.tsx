"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import InputErrorMessage from "@/components/ui/input-error-message";
import Loader from "@/components/ui/loader";
import SystemLoader from "@/components/ui/system-loader";
import { Shimmer } from "@/components/ui/shimmer";
import {
  OrderLineItem,
  PaymentCardMethod,
  PaymentCashMethod,
  PaymentChannel,
} from "./types";
import { resolveCartDisplay } from "@/lib/utils/cart-display";
import { useAuthenticatedUser, useShippingFee } from "@/hooks";
import { getFulfillmentTypeFromSearchParams } from "@/lib/utils/checkout";
import { checkoutSchema, type CheckoutSchemaValues } from "@/schemas";
import { checkoutAPI } from "@/services/mutations";
import { useCartStore } from "@/store/cart-store";
import { useDeliveryPickupModalStore } from "@/store/delivery-pickup-modal-store";
import toast from "react-hot-toast";

type CheckoutCartSummaryProps = {
  items: OrderLineItem[];
  isCheckoutEnabled: boolean;
  paymentChannel: PaymentChannel;
  selectedMethod: PaymentCardMethod | null;
  selectedCashMethod: PaymentCashMethod | null;
};

const ACCOUNT_REDIRECT_DELAY_MS = 1200;

export default function CheckoutCartSummary({
  items,
  isCheckoutEnabled,
  paymentChannel,
  selectedMethod,
  selectedCashMethod,
}: CheckoutCartSummaryProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const cartItems = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const pickupLocation = useDeliveryPickupModalStore(
    (state) => state.pickupLocation,
  );
  const isDelivery =
    getFulfillmentTypeFromSearchParams(searchParams) === "delivery";
  const { data: userData } = useAuthenticatedUser(true);
  const distanceNote = userData?.data?.user?.shipping?.distance_note;
  const { isLoading, errorMessage, shippingFeeData } =
    useShippingFee(isDelivery);
  const {
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutSchemaValues>({
    defaultValues: {
      fulfillment_type: isDelivery ? "delivery" : "pickup",
      payment_method: paymentChannel === "card" ? "stripe" : "cod",
      note: "",
      products: [],
    },
  });
  const shippingRate = shippingFeeData?.shipping_rate;
  const deliveryType = shippingFeeData?.delivery_type;
  const resolvedFee =
    shippingRate?.amount != null ? Number(shippingRate.amount) : null;
  const currentShippingFee = isDelivery ? (resolvedFee ?? 0) : 0;
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const total = subtotal + (items.length ? currentShippingFee : 0);
  const hasItems = items.length > 0;

  const onSubmit = async () => {
    clearErrors();

    if (!cartItems.length) {
      setError("root", {
        type: "manual",
        message: "Your cart is empty.",
      });
      return;
    }

    if (paymentChannel === "card" && !selectedMethod) {
      setError("root", {
        type: "manual",
        message: "Please select a card payment method.",
      });
      return;
    }

    if (paymentChannel === "cash" && !selectedCashMethod) {
      setError("root", {
        type: "manual",
        message: "Please select a cash payment method.",
      });
      return;
    }

    const payload = {
      fulfillment_type: isDelivery ? "delivery" : "pickup",
      payment_method: paymentChannel === "card" ? "stripe" : "cod",
      note: "",
      products: cartItems.map((item) => {
        const flavorTotal = item.flavors
          ? Object.values(item.flavors).reduce((a, b) => a + b, 0)
          : null;
        return {
          slug: item.slug || item.id,
          price_id: item.price_id ?? 0,
          quantity: flavorTotal ?? item.quantity,
          ...(item.flavors
            ? {
                meta: {
                  flavors: Object.entries(item.flavors).map(([name, qty]) => ({
                    name,
                    qty,
                  })),
                },
              }
            : {}),
        };
      }),
      ...(isDelivery ? {} : { shop_id: pickupLocation.id ?? undefined }),
      ...(paymentChannel === "cash"
        ? {
            cod_payment_method:
              selectedCashMethod === "pay-cash"
                ? "cash"
                : selectedCashMethod === "apple-pay"
                  ? "apple_pay"
                  : selectedCashMethod === "cash-app"
                    ? "cash_app"
                    : (selectedCashMethod ?? undefined),
          }
        : {}),
    };

    const schemaResult = checkoutSchema.safeParse(payload);

    if (!schemaResult.success) {
      setError("root", {
        type: "manual",
        message:
          schemaResult.error.issues[0]?.message || "Invalid checkout data.",
      });
      return;
    }
    const result = await checkoutAPI(schemaResult.data);
    console.log("checkoutAPI result", result);
    if (!result?.ok) {
      setError("root", {
        type: "server",
        message: result?.message || "Checkout failed. Please try again.",
      });
      return;
    }

    const checkoutUrl = result.data?.checkout_url;
    clearCart();

    if (schemaResult.data.payment_method === "cod") {
      toast.success(result?.message || "Order created successfully");
      await queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
      const orderNumber = result.data?.order_number;
      setIsRedirecting(true);
      queryClient.removeQueries({ queryKey: ["orders"] });
      window.setTimeout(() => {
        router.push(
          orderNumber
            ? `/account?tab=new-order&order-number=${orderNumber}`
            : "/account?tab=new-order",
        );
      }, ACCOUNT_REDIRECT_DELAY_MS);
      return;
    }

    if (typeof checkoutUrl === "string" && checkoutUrl.length > 0) {
      window.location.assign(checkoutUrl);
      return;
    }

    toast.success(result?.message || "Checkout created successfully");
    await queryClient.invalidateQueries({
      queryKey: ["orders"],
    });
  };

  return (
    <>
      {isRedirecting ? <SystemLoader /> : null}

      <form
        className="rounded-2xl bg-bg-creamy p-4 shadow-xs sm:p-5 lg:sticky lg:top-24"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-4 flex items-center gap-2 text-primary">
          <ShoppingCart className="size-4" />
          <h2 className="text-base font-medium">My Cart</h2>
        </div>

        <div className="space-y-3 rounded-2xl bg-background p-4">
          {hasItems ? (
            <>
              {items.map((item) => {
                const { flavorLines, displayQuantity } =
                  resolveCartDisplay(item);
                return (
                  <div
                    key={`checkout-${item.id}`}
                    className="flex items-start justify-between gap-3 text-sm"
                  >
                    <div className="min-w-0">
                      <p className="font-semibold capitalize text-dark">
                        {item.title}
                      </p>
                      {item.priceLabel && (
                        <p className="text-xs font-semibold capitalize text-primary">
                          {item.priceLabel}
                          <span className="text-secondary/50">
                            {" "}
                            × {displayQuantity}
                          </span>
                        </p>
                      )}
                      {flavorLines.map(({ label, count }) => (
                        <p
                          key={label}
                          className="text-xs capitalize text-secondary/60"
                        >
                          {count}x {label}
                        </p>
                      ))}
                    </div>
                    <span className="shrink-0 font-semibold text-dark">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                );
              })}

              {isDelivery ? (
                <div className="border-t border-primary/20 pt-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Shipping Fee</span>
                    {isLoading ? (
                      <Shimmer className="h-5 w-16 rounded-full bg-primary/10" />
                    ) : resolvedFee != null ? (
                      <span className="font-medium text-primary">
                        ${resolvedFee.toFixed(2)}
                      </span>
                    ) : null}
                  </div>

                  {!isLoading && shippingRate && (
                    <div className="mt-1 flex items-center justify-between text-xs text-secondary/60">
                      <span>
                        {shippingRate.provider} · {shippingRate.service}
                        {deliveryType === "usps_shipping" &&
                          shippingRate.days != null &&
                          ` · ${shippingRate.days} day${shippingRate.days !== 1 ? "s" : ""}`}
                      </span>
                      {deliveryType === "local_delivery" && (
                        <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                          Local
                        </span>
                      )}
                      {deliveryType === "usps_shipping" && (
                        <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
                          USPS
                        </span>
                      )}
                    </div>
                  )}

                  {distanceNote && (
                    <p className="mt-1 text-xs text-amber-600">
                      {distanceNote}
                    </p>
                  )}
                  <InputErrorMessage msg={errorMessage ?? undefined} className="pt-1" />
                </div>
              ) : null}

              <div className="flex items-center justify-between border-t border-primary/20 pt-3">
                <span className="text-lg font-semibold text-dark">Total</span>
                <span className="text-2xl font-semibold text-primary">
                  ${total.toFixed(0)}
                </span>
              </div>
            </>
          ) : (
            <div className="rounded-xl border border-dashed border-primary/40 bg-bg-creamy p-6 text-center text-sm text-gray-600">
              Your cart is empty.
            </div>
          )}
        </div>

        <Button
          type="submit"
          disabled={!isCheckoutEnabled || isSubmitting || isRedirecting}
          className="mt-5 h-11 w-full rounded-md bg-primary text-sm text-white hover:bg-primary/90 disabled:bg-primary/80"
        >
          {isSubmitting ? <Loader /> : "Check Out"}
        </Button>

        <InputErrorMessage msg={errors.root?.message} />
      </form>
    </>
  );
}

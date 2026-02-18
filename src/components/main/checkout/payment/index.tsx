"use client";

import { useMemo, useState } from "react";
import { useCartStore } from "@/store/cart-store";

import CheckoutCartSummary from "./checkout-cart-summary";
import CheckoutHero from "./checkout-breadcrumb";
import OrderDetailsList from "./order-details-list";
import PaymentCashOptions from "./payment-cash-options";
import PaymentChannelTabs from "./payment-channel-tabs";
import PaymentMethodOptions from "./payment-method-options";
import PaymentSelectionEmptyState from "./payment-selection-empty-state";
import ReceiverDetailsForm from "./receiver-details-form";
import ShippingLocationCard from "./shipping-location-card";
import {
  OrderLineItem,
  PaymentCardMethod,
  PaymentCashMethod,
  PaymentChannel,
} from "./types";

const sampleSubtitle =
  "Light and moist vanilla cake with Madagascar vanilla beans and silky buttercream frosting.";

const fallbackItems: OrderLineItem[] = [
  {
    id: "fallback-1",
    title: "Sourdough Bread",
    subtitle: sampleSubtitle,
    price: 8.5,
    quantity: 2,
    image: "/images/artisan-sourdough.jpg",
  },
  {
    id: "fallback-2",
    title: "Multigrain Bread",
    subtitle: sampleSubtitle,
    price: 8.5,
    quantity: 2,
    image: "/images/french-baguette.jpg",
  },
  {
    id: "fallback-3",
    title: "Whole Grain Bread",
    subtitle: sampleSubtitle,
    price: 8.5,
    quantity: 1,
    image: "/images/bread-category.png",
  },
];

export default function CheckoutPaymentPage() {
  const cartItems = useCartStore((state) => state.items);
  const [paymentChannel, setPaymentChannel] = useState<PaymentChannel>("card");
  const [selectedMethod, setSelectedMethod] =
    useState<PaymentCardMethod | null>(null);
  const [selectedCashMethod, setSelectedCashMethod] =
    useState<PaymentCashMethod | null>(null);

  const orderItems = useMemo<OrderLineItem[]>(
    () =>
      cartItems.length
        ? cartItems.map((item) => ({
            id: item.id,
            title: item.title,
            subtitle: sampleSubtitle,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
          }))
        : fallbackItems,
    [cartItems],
  );

  const isCheckoutEnabled =
    paymentChannel === "card"
      ? Boolean(selectedMethod)
      : Boolean(selectedCashMethod);

  return (
    <>
      <CheckoutHero />

      <section className="bg-[#f7f7f7] py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-5 sm:px-10">
          <div className="grid gap-6 lg:grid-cols-[1.3fr_0.9fr] lg:items-start">
            <div className="space-y-4">
              <ShippingLocationCard />
              <ReceiverDetailsForm />
              <OrderDetailsList items={orderItems} />

              <PaymentChannelTabs
                value={paymentChannel}
                onChange={(next) => {
                  setPaymentChannel(next);
                  if (next === "cash") setSelectedMethod(null);
                  if (next === "card") setSelectedCashMethod(null);
                }}
              />

              {paymentChannel === "card" && (
                <PaymentMethodOptions
                  selectedMethod={selectedMethod}
                  onSelectMethod={setSelectedMethod}
                />
              )}

              {paymentChannel === "cash" && (
                <PaymentCashOptions
                  selectedMethod={selectedCashMethod}
                  onSelectMethod={setSelectedCashMethod}
                />
              )}

              {paymentChannel === "card" && (
                <PaymentSelectionEmptyState
                  selected={Boolean(selectedMethod)}
                />
              )}
            </div>

            <CheckoutCartSummary
              items={orderItems}
              isCheckoutEnabled={isCheckoutEnabled}
            />
          </div>
        </div>
      </section>
    </>
  );
}

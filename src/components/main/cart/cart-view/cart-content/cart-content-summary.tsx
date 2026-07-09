"use client";

import { Suspense } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthenticatedUser } from "@/hooks";
import { getCheckoutPath, hasSavedCheckoutDetails } from "@/lib/utils/checkout";
import { useCartStore } from "@/store/cart-store";
import type { CartItem } from "@/store/cart-store";
import { useDeliveryPickupModalStore } from "@/store/delivery-pickup-modal-store";
import { resolveCartDisplay } from "@/lib/utils/cart-display";

type CartContentSummaryProps = {
  hasToken: boolean;
  items: CartItem[];
  total: number;
};

export default function CartContentSummary({
  hasToken,
  items,
  total,
}: CartContentSummaryProps) {
  return (
    <Suspense
      fallback={
        <aside className="rounded-2xl bg-bg-creamy p-4 shadow-xs sm:p-5">
          <div className="flex items-center gap-2 pb-4 text-primary">
            <ShoppingCart className="size-4" />
            <h2 className="text-base font-medium">My Cart</h2>
          </div>

          <div className="rounded-2xl bg-background p-4">
            <div className="space-y-3">
              {items.map((item) => {
                const { flavorLines, displayQuantity } = resolveCartDisplay(item);
                return (
                  <div key={`${item.id}-summary-fallback`} className="flex items-start justify-between gap-3 text-sm">
                    <div className="min-w-0">
                      <p className="font-semibold capitalize text-dark">
                        {item.title}
                      </p>
                      {item.priceLabel && (
                        <p className="text-xs font-semibold capitalize text-primary">
                          {item.priceLabel}
                          <span className="text-secondary/50"> × {displayQuantity}</span>
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
            </div>

            <div className="mt-3 flex items-center justify-between border-t border-primary/20 pt-3">
              <p className="text-lg font-semibold text-dark">Total</p>
              <p className="text-2xl font-semibold text-primary">
                ${total.toFixed(0)}
              </p>
            </div>
          </div>

          <Button
            disabled
            className="mt-5 h-11 w-full rounded-md bg-primary text-sm text-white hover:bg-primary"
          >
            Check Out
            <ArrowRight className="size-4" />
          </Button>
        </aside>
      }
    >
      <CartContentSummaryContent
        hasToken={hasToken}
        items={items}
        total={total}
      />
    </Suspense>
  );
}

function CartContentSummaryContent({
  hasToken,
  items,
  total,
}: CartContentSummaryProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const openModal = useDeliveryPickupModalStore((state) => state.openModal);
  const setShouldRedirectToCheckout = useDeliveryPickupModalStore(
    (state) => state.setShouldRedirectToCheckout,
  );
  const closeCart = useCartStore((state) => state.closeCart);
  const { data, isLoading } = useAuthenticatedUser(hasToken);

  const handleCheckout = () => {
    if (!hasToken) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("openLocation", "1");

      const returnTo = params.toString()
        ? `${pathname}?${params.toString()}`
        : pathname;

      router.push(`/login?returnTo=${encodeURIComponent(returnTo)}`);
      return;
    }

    const user = data?.data?.user;

    if (hasSavedCheckoutDetails(user)) {
      closeCart();
      const currentFulfillmentType = searchParams.get("fulfillment-type");
      router.push(
        getCheckoutPath(currentFulfillmentType ?? user?.last_fulfillment_type),
      );
      return;
    }

    setShouldRedirectToCheckout(true);
    openModal();
  };

  return (
    <aside className="rounded-2xl bg-bg-creamy p-4 shadow-xs sm:p-5">
      <div className="flex items-center gap-2 pb-4 text-primary">
        <ShoppingCart className="size-4" />
        <h2 className="text-base font-medium">My Cart</h2>
      </div>

      <div className="rounded-2xl bg-background p-4">
        <div className="space-y-3">
          {items.map((item) => {
            const { flavorLines, displayQuantity } = resolveCartDisplay(item);
            return (
              <div key={`${item.id}-summary`} className="flex items-start justify-between gap-3 text-sm">
                <div className="min-w-0">
                  <p className="font-semibold capitalize text-dark">
                    {item.title}
                  </p>
                  {item.priceLabel && (
                    <p className="text-xs font-semibold capitalize text-primary">
                      {item.priceLabel}
                      <span className="text-secondary/50"> × {displayQuantity}</span>
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
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-primary/20 pt-3">
          <p className="text-lg font-semibold text-dark">Total</p>
          <p className="text-2xl font-semibold text-primary">
            ${total.toFixed(0)}
          </p>
        </div>
      </div>

      <Button
        onClick={handleCheckout}
        disabled={hasToken && isLoading}
        className="mt-5 h-11 w-full rounded-md bg-primary text-sm text-white hover:bg-primary/90"
      >
        Check Out
        <ArrowRight className="size-4" />
      </Button>
    </aside>
  );
}

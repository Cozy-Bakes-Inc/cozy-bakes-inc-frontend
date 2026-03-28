"use client";

import { Suspense } from "react";
import { ArrowRight, Trash2 } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useAuthenticatedUser } from "@/hooks";
import { getCheckoutPath, hasSavedCheckoutDetails } from "@/lib/utils/checkout";
import { useCartStore } from "@/store/cart-store";
import { useDeliveryPickupModalStore } from "@/store/delivery-pickup-modal-store";

type CartPanelActionsProps = {
  hasToken: boolean;
  total: number;
  onClearCart: () => void;
};

export default function CartPanelActions({
  hasToken,
  total,
  onClearCart,
}: CartPanelActionsProps) {
  return (
    <Suspense
      fallback={
        <>
          <div className="mt-3 border-t border-[#EAECF0] pt-3">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold tracking-[0.06em] text-dark sm:text-sm">
                Total
              </p>
              <p className="text-xl font-semibold leading-7 text-primary sm:text-[26px]">
                ${total.toFixed(2)}
              </p>
            </div>
          </div>

          <Button
            disabled
            className="mt-3 h-12.5 w-full rounded-xl bg-primary text-sm text-white hover:bg-primary sm:text-base"
          >
            Check Out
            <ArrowRight className="size-4" />
          </Button>

          <Button
            variant="outline"
            onClick={onClearCart}
            className="mt-2 h-12.5 w-full rounded-xl border-primary/40 text-sm text-primary hover:bg-primary/5 hover:text-primary sm:text-base"
          >
            Clear Cart
            <Trash2 className="size-4" />
          </Button>
        </>
      }
    >
      <CartPanelActionsContent
        hasToken={hasToken}
        total={total}
        onClearCart={onClearCart}
      />
    </Suspense>
  );
}

function CartPanelActionsContent({
  hasToken,
  total,
  onClearCart,
}: CartPanelActionsProps) {
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
      router.push(getCheckoutPath(user?.last_fulfillment_type));
      return;
    }

    setShouldRedirectToCheckout(true);
    openModal();
  };

  return (
    <>
      <div className="mt-3 border-t border-[#EAECF0] pt-3">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold tracking-[0.06em] text-dark sm:text-sm">
            Total
          </p>
          <p className="text-xl font-semibold leading-7 text-primary sm:text-[26px]">
            ${total.toFixed(2)}
          </p>
        </div>
      </div>

      <Button
        onClick={handleCheckout}
        disabled={hasToken && isLoading}
        className="mt-3 h-12.5 w-full rounded-xl bg-primary text-sm text-white hover:bg-primary/90 sm:text-base"
      >
        Check Out
        <ArrowRight className="size-4" />
      </Button>

      <Button
        variant="outline"
        onClick={onClearCart}
        className="mt-2 h-12.5 w-full rounded-xl border-primary/40 text-sm text-primary hover:bg-primary/5 hover:text-primary sm:text-base"
      >
        Clear Cart
        <Trash2 className="size-4" />
      </Button>
    </>
  );
}

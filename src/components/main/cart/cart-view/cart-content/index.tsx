"use client";

import { useRouter } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { Button } from "@/components/ui/button";

import CartContentEmptyState from "./cart-content-empty-state";
import CartContentItemsList from "./cart-content-items-list";
import CartContentSummary from "./cart-content-summary";

type CartContentProps = {
  hasToken: boolean;
};

export default function CartContent({ hasToken }: CartContentProps) {
  const router = useRouter();
  const { items, updateQuantity, removeItem } = useCartStore();

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <section className="bg-background py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-10">
        <div className="grid gap-6 lg:grid-cols-[1.45fr_1fr] lg:items-start">
          {items.length === 0 ? (
            <CartContentEmptyState />
          ) : (
            <CartContentItemsList
              items={items}
              onUpdateQuantity={updateQuantity}
              onRemoveItem={removeItem}
            />
          )}

          {items.length > 0 && (
            <CartContentSummary
              hasToken={hasToken}
              items={items}
              total={total}
            />
          )}
        </div>

        {items.length > 0 && (
          <div className="mt-8 flex justify-center">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/menu")}
              className="h-11 min-w-60 rounded-md border-primary bg-background px-8 text-sm font-medium text-primary shadow-[0_10px_25px_rgba(102,72,28,0.08)] hover:bg-bg-creamy hover:border-secondary hover:text-secondary"
            >
              <ShoppingCart className="size-4" />
              Continue Shopping
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

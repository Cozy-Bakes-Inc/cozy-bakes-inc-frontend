"use client";

import { useCartStore } from "@/store/cart-store";

import CartContentEmptyState from "./cart-content-empty-state";
import CartContentItemsList from "./cart-content-items-list";
import CartContentSummary from "./cart-content-summary";

export default function CartContent() {
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
            <CartContentSummary items={items} total={total} />
          )}
        </div>
      </div>
    </section>
  );
}

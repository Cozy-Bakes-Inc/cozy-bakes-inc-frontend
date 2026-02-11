"use client";

import { ShoppingCart, X } from "lucide-react";

import Panel from "@/components/ui/panel";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import CartPanelEmptyState from "./cart-panel-empty-state";
import CartPanelItemsList from "./cart-panel-items-list";
import CartPanelMyLikeCarousel from "./cart-panel-my-like-carousel";
import CartPanelActions from "./cart-panel-actions";

export default function CartPanel() {
  const {
    items,
    isCartOpen,
    closeCart,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCartStore();

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <Panel
      open={isCartOpen}
      onClose={closeCart}
      side="left"
      contentClassName="w-[410px] max-w-[88vw] gap-0 border-r-0 rounded-r-[32px] rounded-l-none bg-background p-0"
      hideDefaultCloseButton
    >
      <div className="relative flex h-full min-h-0 flex-col">
        <div className="flex h-20 items-center justify-between bg-bg-creamy px-6">
          <div className="flex items-center gap-2 text-primary">
            <ShoppingCart className="size-5" />
            <p className="text-xs font-medium sm:text-sm">My Select Item</p>
          </div>

          <Button
            type="button"
            variant="outline"
            className="h-10 rounded-full border-primary bg-primary px-4 text-xs font-medium text-white hover:bg-primary/90 hover:text-white sm:text-sm"
          >
            View Cart
          </Button>
        </div>

        <button
          type="button"
          onClick={closeCart}
          className="absolute -right-3 top-23.5 z-10 grid size-6.5 place-items-center rounded-full bg-white"
          aria-label="Close cart panel"
        >
          <span className="grid size-6.5 place-items-center rounded-full border border-primary bg-[#FBF8EB40] text-primary">
            <X className="size-4" />
          </span>
        </button>

        {items.length === 0 ? (
          <CartPanelEmptyState onClose={closeCart} />
        ) : (
          <div className="flex min-h-0 flex-1 flex-col bg-background">
            <CartPanelItemsList
              items={items}
              onUpdateQuantity={updateQuantity}
              onRemoveItem={removeItem}
            />

            <div className="rounded-t-2xl border-t border-[rgba(201,165,90,0.24)] bg-bg-creamy px-4 pb-4 pt-3">
              <CartPanelMyLikeCarousel items={items} onAddItem={addItem} />
              <CartPanelActions total={total} onClearCart={clearCart} />
            </div>
          </div>
        )}
      </div>
    </Panel>
  );
}

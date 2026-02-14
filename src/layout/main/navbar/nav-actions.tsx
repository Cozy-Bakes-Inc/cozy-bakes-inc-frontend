"use client";

import { Button } from "@/components/ui/button";
import { Search, ShoppingCart, UserRound } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import CartPanel from "@/components/main/cart/cart-panel";

export default function NavActions() {
  const openCart = useCartStore((state) => state.openCart);
  const totalQuantity = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0),
  );

  return (
    <>
      <div className="hidden sm:flex items-center gap-3">
        <Button
          variant="outline"
          size="icon"
          className="group border-primary text-primary hover:text-secondary hover:border-secondary bg-[#FBF8EB]/25 rounded-full"
        >
          <Search className="size-5 shrink-0" strokeWidth={2.8} />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={openCart}
          className="relative border-primary text-primary hover:text-secondary hover:border-secondary bg-[#FBF8EB]/25 rounded-full"
        >
          <ShoppingCart className="size-5 shrink-0" strokeWidth={2.8} />
          {totalQuantity > 0 && (
            <span className="absolute -right-1 -top-1 grid size-4 place-items-center rounded-full bg-primary text-[10px] font-semibold text-white">
              {totalQuantity > 9 ? "9+" : totalQuantity}
            </span>
          )}
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="border-primary text-primary hover:text-secondary hover:border-secondary bg-[#FBF8EB]/25 rounded-full"
        >
          <UserRound className="size-5 shrink-0" strokeWidth={2.8} />
        </Button>
      </div>
      <CartPanel />
    </>
  );
}

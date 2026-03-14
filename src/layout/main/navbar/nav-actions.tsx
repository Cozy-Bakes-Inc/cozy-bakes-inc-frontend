"use client";

import { Button } from "@/components/ui/button";
import { ShoppingCart, UserRound } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import CartPanel from "@/components/main/cart/cart-panel";
import { useRouter } from "next/navigation";
import { useAuthenticatedUser } from "@/hooks";
import { Shimmer } from "@/components/ui/shimmer";

type NavActionsProps = {
  hasToken: boolean;
};

export default function NavActions({ hasToken }: NavActionsProps) {
  const router = useRouter();
  const { data, isLoading } = useAuthenticatedUser(hasToken);
  const openCart = useCartStore((state) => state.openCart);
  const totalQuantity = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0),
  );
  const firstName = data?.data?.user?.first_name?.trim();

  const handleAccount = () => {
    router.push("/account");
  };

  return (
    <>
      <div className="hidden sm:flex items-center gap-3">
        {/* <Button
          variant="outline"
          size="icon"
          className="group border-primary text-primary hover:text-secondary hover:border-secondary bg-[#FBF8EB]/25 rounded-full"
        >
          <Search className="size-5 shrink-0" strokeWidth={2.8} />
        </Button> */}

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

        {hasToken ? (
          <Button
            onClick={handleAccount}
            variant="outline"
            className="h-12 rounded-full border-primary bg-bg-creamy/25 px-3 text-dark hover:border-secondary hover:bg-bg-creamy/40 hover:text-dark"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <Shimmer className="size-6 rounded-full bg-primary/15" />
                <Shimmer className="h-5 w-24 rounded-full bg-primary/15" />
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <UserRound
                  className="size-5 shrink-0 text-primary"
                  strokeWidth={2.8}
                />
                <span className="text-[14px] font-medium leading-6">
                  Hi!,{firstName || "User"}
                </span>
              </div>
            )}
          </Button>
        ) : (
          <Button
            onClick={handleAccount}
            variant="outline"
            size="icon"
            className="border-primary text-primary hover:text-secondary hover:border-secondary bg-bg-creamy/25 rounded-full"
          >
            <UserRound className="size-5 shrink-0" strokeWidth={2.8} />
          </Button>
        )}
      </div>
      <CartPanel hasToken={hasToken} />
    </>
  );
}

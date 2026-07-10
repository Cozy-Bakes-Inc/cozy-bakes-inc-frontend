"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SystemLoader from "@/components/ui/system-loader";
import { useCartStore } from "@/store/cart-store";

export default function PaymentSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    clearCart();
    const orderNumber = searchParams.get("order-number");
    const dest = orderNumber
      ? `/account?tab=new-order&order-number=${orderNumber}`
      : "/account?tab=new-order";
    router.replace(dest);
  }, [router, searchParams, clearCart]);

  return <SystemLoader />;
}

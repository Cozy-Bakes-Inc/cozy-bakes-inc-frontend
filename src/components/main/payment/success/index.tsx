"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SystemLoader from "@/components/ui/system-loader";

export default function PaymentSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const orderNumber = searchParams.get("order-number");
    const dest = orderNumber
      ? `/account?tab=new-order&order-number=${orderNumber}`
      : "/account?tab=new-order";
    router.replace(dest);
  }, [router, searchParams]);

  return <SystemLoader />;
}

"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SystemLoader from "@/components/ui/system-loader";

export default function PaymentSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const orderNumber = searchParams.get("order_number");
    const dest = orderNumber
      ? `/account?tab=new-order&order_number=${orderNumber}`
      : "/account?tab=new-order";
    router.replace(dest);
  }, [router, searchParams]);

  return <SystemLoader />;
}

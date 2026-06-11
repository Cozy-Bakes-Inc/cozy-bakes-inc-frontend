"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SystemLoader from "@/components/ui/system-loader";

export default function PaymentCancel() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fulfillmentType = searchParams.get("fulfillment-type") ?? "delivery";
    router.replace(`/checkout?fulfillment-type=${fulfillmentType}`);
  }, [router, searchParams]);

  return <SystemLoader />;
}

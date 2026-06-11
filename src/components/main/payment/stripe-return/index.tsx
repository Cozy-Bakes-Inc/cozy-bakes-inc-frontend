"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SystemLoader from "@/components/ui/system-loader";

export default function StripeReturn() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const dest = searchParams.get("dest") ?? "";
    // Only allow relative paths to prevent open redirects
    if (dest.startsWith("/") && !dest.startsWith("//")) {
      router.replace(dest);
    } else {
      router.replace("/");
    }
  }, [router, searchParams]);

  return <SystemLoader />;
}

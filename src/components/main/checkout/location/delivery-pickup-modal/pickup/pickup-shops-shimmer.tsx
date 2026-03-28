"use client";

import { Shimmer } from "@/components/ui/shimmer";

interface PickupShopsShimmerProps {
  count?: number;
}

export default function PickupShopsShimmer({
  count = 2,
}: PickupShopsShimmerProps) {
  return (
    <div className="grid gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="rounded-2xl border border-border/24 bg-background p-4 sm:p-5"
        >
          <Shimmer className="h-4 w-28 rounded-full" />
          <Shimmer className="mt-3 h-6 w-40" />
          <Shimmer className="mt-2 h-4 w-3/4" />
          <Shimmer className="mt-5 h-16 w-full" />
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <Shimmer className="h-4 w-full" />
            <Shimmer className="h-4 w-full" />
          </div>
          <div className="mt-5 flex justify-end">
            <Shimmer className="h-10 w-32 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

"use client";

import { Shimmer } from "@/components/ui/shimmer";

export default function ProductContentShimmer() {
  return (
    <>
      <section className="bg-bg-creamy py-12 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-10 lg:grid-cols-2 lg:items-stretch">
          <Shimmer className="h-105 w-full rounded-3xl bg-background" />
          <div className="h-105 rounded-3xl bg-background p-6 shadow-sm sm:p-8">
            <div className="flex h-full flex-col space-y-5">
              <Shimmer className="h-10 w-2/3" />
              <Shimmer className="h-5 w-full" />
              <Shimmer className="h-5 w-5/6" />
              <div className="flex items-center justify-between gap-4">
                <Shimmer className="h-8 w-28" />
                <Shimmer className="h-6 w-24" />
              </div>
              <Shimmer className="h-20 w-full" />
              <div className="flex items-center justify-between gap-4">
                <Shimmer className="h-6 w-20" />
                <Shimmer className="h-10 w-28 rounded-full" />
              </div>
              <Shimmer className="h-11 w-full rounded-full" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-10">
          <div className="grid grid-cols-2 gap-4 rounded-full border border-primary/50 bg-bg-creamy p-2">
            <Shimmer className="h-11 w-full rounded-full" />
            <Shimmer className="h-11 w-full rounded-full" />
          </div>
          <div className="mt-6 rounded-3xl bg-bg-creamy p-6 shadow-sm sm:p-8">
            <Shimmer className="h-7 w-40" />
            <Shimmer className="mt-4 h-5 w-full" />
            <Shimmer className="mt-3 h-5 w-4/5" />
          </div>
        </div>
      </section>
    </>
  );
}

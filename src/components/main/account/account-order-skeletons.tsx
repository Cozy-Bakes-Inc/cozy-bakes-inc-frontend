"use client";

import { Shimmer } from "@/components/ui/shimmer";

export function AccountOrderCardSkeleton() {
  return (
    <article className="rounded-2xl border border-border/24 bg-bg-creamy p-2.5">
      <div className="flex items-start gap-2">
        <Shimmer className="size-17.75 shrink-0 rounded-lg" />
        <div className="min-w-0 flex-1 space-y-2">
          <Shimmer className="h-7 w-52 rounded-md" />
          <Shimmer className="h-5 w-full rounded-md" />
          <Shimmer className="h-5 w-3/4 rounded-md" />
        </div>
      </div>

      <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <div className="space-y-2">
          <Shimmer className="h-4 w-16 rounded-md" />
          <Shimmer className="h-8 w-24 rounded-md" />
        </div>
        <Shimmer className="h-10 w-full rounded-full sm:w-44" />
      </div>
    </article>
  );
}

export function AccountOrderDetailsSkeleton() {
  return (
    <div className="mt-4 space-y-5">
      <section className="overflow-x-auto pb-2">
        <div className="grid min-w-190 grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex flex-col items-center">
              <Shimmer className="size-10 rounded-full" />
              <Shimmer className="mt-3 h-4 w-20 rounded-md" />
              <Shimmer className="mt-1 h-3 w-24 rounded-md" />
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl bg-bg-creamy p-4 sm:p-6">
        <Shimmer className="h-7 w-40 rounded-md" />
        <div className="mt-4 space-y-3">
          {Array.from({ length: 2 }).map((_, index) => (
            <article
              key={index}
              className="rounded-2xl border border-border/24 bg-bg-creamy p-2.5"
            >
              <div className="flex items-start gap-2">
                <Shimmer className="size-17.75 shrink-0 rounded-lg" />
                <div className="min-w-0 flex-1 space-y-2">
                  <Shimmer className="h-7 w-40 rounded-md" />
                  <Shimmer className="h-4 w-full rounded-md" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

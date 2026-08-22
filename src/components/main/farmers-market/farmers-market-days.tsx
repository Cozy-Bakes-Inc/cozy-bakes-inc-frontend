"use client";

import MarketShowcase from "@/components/main/market-showcase";
import { Shimmer } from "@/components/ui/shimmer";
import type { UpcomingMarket } from "@/types/main/farmers-market";
import { toMarketSlide } from ".";
import { CalendarClock, Sparkles } from "lucide-react";

type Props = {
  days: [string, UpcomingMarket[]][];
  isLoading: boolean;
};

function FarmersMarketDays({ days, isLoading }: Props) {
  if (isLoading) {
    return (
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-10">
          <Shimmer className="mx-auto h-8 w-48 rounded-full" />
          <Shimmer className="mt-10 h-120 w-full" />
        </div>
      </section>
    );
  }

  if (days.length === 0) {
    return (
      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-10">
          <h2 className="text-center text-xl font-bold text-heading-2 sm:text-2xl">
            Upcoming Market Days
          </h2>

          <div className="relative isolate mx-auto mt-10 max-w-3xl overflow-hidden rounded-3xl border border-primary/20 bg-bg-creamy px-6 py-12 text-center shadow-[0_18px_50px_rgba(135,67,6,0.06)] sm:px-10 sm:py-14">
            <div
              aria-hidden="true"
              className="absolute -left-20 -top-24 -z-10 size-56 rounded-full bg-primary/8 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-24 -right-16 -z-10 size-60 rounded-full bg-secondary/8 blur-3xl"
            />

            <div className="relative mx-auto grid size-20 place-items-center rounded-2xl border border-primary/15 bg-background text-primary shadow-[0_12px_28px_rgba(135,67,6,0.10)]">
              <CalendarClock
                aria-hidden="true"
                className="size-9"
                strokeWidth={1.7}
              />
              <span className="absolute -right-2 -top-2 grid size-8 place-items-center rounded-full bg-primary text-white shadow-md">
                <Sparkles aria-hidden="true" className="size-4" />
              </span>
            </div>

            <h3 className="mt-6 text-2xl font-semibold tracking-tight text-dark sm:text-3xl">
              The next stop is being planned
            </h3>
            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray sm:text-base sm:leading-7">
              We&apos;re preparing our upcoming market schedule. Check back
              soon for fresh dates, locations, and all the treats we&apos;ll be
              bringing along.
            </p>

            <div
              aria-hidden="true"
              className="mx-auto mt-7 flex w-fit items-center gap-2"
            >
              <span className="size-1.5 rounded-full bg-primary/35" />
              <span className="h-1.5 w-8 rounded-full bg-primary/70" />
              <span className="size-1.5 rounded-full bg-primary/35" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {days.map(([day, markets]) => (
        <MarketShowcase
          key={day}
          slides={markets.map(toMarketSlide)}
          dotsBottom="-bottom-13"
          sectionClassName="py-20"
          title={`${day} Market`}
        />
      ))}
    </>
  );
}

export default FarmersMarketDays;

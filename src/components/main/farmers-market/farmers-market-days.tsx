"use client";

import MarketShowcase from "@/components/main/market-showcase";
import { Shimmer } from "@/components/ui/shimmer";
import type { UpcomingMarket } from "@/types/main/farmers-market";
import { toMarketSlide } from ".";

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

  if (days.length === 0) return null;

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

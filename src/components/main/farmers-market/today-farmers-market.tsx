"use client";

import MarketShowcase from "@/components/main/market-showcase";
import { Shimmer } from "@/components/ui/shimmer";
import type { MarketSlide } from "@/interfaces";

type Props = {
  slides: MarketSlide[];
  isLoading: boolean;
};

export default function TodayFarmersMarket({ slides, isLoading }: Props) {
  if (isLoading) {
    return (
      <section className="relative bg-[url('/images/farmer-market-bg.png')] bg-cover bg-center py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-10">
          <Shimmer className="mx-auto h-8 w-48 rounded-full" />
          <Shimmer className="mt-10 h-120 w-full" />
        </div>
      </section>
    );
  }

  if (slides.length === 0) return null;

  return (
    <MarketShowcase
      slides={slides}
      dotsBottom="-bottom-13"
      sectionClassName="relative bg-[url('/images/farmer-market-bg.png')] bg-cover bg-center py-20"
      title="Today's Markets"
    />
  );
}

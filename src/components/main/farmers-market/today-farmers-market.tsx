"use client";

import MarketShowcase from "@/components/main/market-showcase";
import { marketSlides } from "@/data";

export default function TodayFarmersMarket() {
  return (
    <MarketShowcase
      slides={marketSlides}
      dotsBottom="-bottom-13"
      sectionClassName="relative bg-[url('/images/farmer-market-bg.png')] bg-cover bg-center py-20"
      title="Today's Markets"
    />
  );
}

"use client";

import MarketShowcase from "@/components/main/market-showcase";
import { marketSlides } from "@/data";

function FarmersMarketDays() {
  return (
    <MarketShowcase
      slides={marketSlides}
      dotsBottom="-bottom-13"
      sectionClassName="py-20"
      title="Friday Market"
    />
  );
}

export default FarmersMarketDays;

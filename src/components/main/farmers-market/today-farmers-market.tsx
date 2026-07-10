"use client";

import MarketShowcase from "@/components/main/market-showcase";
import { Shimmer } from "@/components/ui/shimmer";
import { Image } from "@/components/ui/app-image";
import type { MarketSlide } from "@/interfaces";

type Props = {
  slides: MarketSlide[];
  isLoading: boolean;
};

export default function TodayFarmersMarket({ slides, isLoading }: Props) {
  if (isLoading) {
    return (
      <section className="relative py-20">
        <Image
          src="/images/farmer-market-bg.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-10">
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
      sectionClassName="relative py-20"
      backgroundSrc="/images/farmer-market-bg.png"
      title="Today's Markets"
    />
  );
}

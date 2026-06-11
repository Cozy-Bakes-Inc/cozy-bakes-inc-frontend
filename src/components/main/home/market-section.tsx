"use client";

import Image from "next/image";
import MarketShowcase from "@/components/main/market-showcase";
import { Shimmer } from "@/components/ui/shimmer";
import { useUpcomingMarkets } from "@/hooks";
import type { MarketSlide } from "@/interfaces";
import { formatMarketDateRange } from "@/lib/utils/market-date";
import type { UpcomingMarket } from "@/types/main";

function toMarketSlide(market: UpcomingMarket): MarketSlide {
  return {
    image: market.cover_images[0] ?? "/images/farmer-market-bg.png",
    badge: market.tag_label,
    title: market.market_name,
    desc: market.description,
    date: market.day,
    endDate: formatMarketDateRange(market.date, market.end_date),
    time: market.time,
    endTime: market.end_time,
    address: market.location_address,
    primaryCta: "Get Directions",
    secondaryCta: "Learn More",
    primaryCtaHref: market.map_link,
    secondaryCtaHref: "/farmers-market",
  };
}

function MarketSectionSkeleton() {
  return (
    <section className="relative bg-[url('/images/farmer-market-bg.png')] bg-cover bg-center py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-10">
        <div className="text-center">
          <Shimmer className="mx-auto h-8 w-36 rounded-full" />
          <Shimmer className="mx-auto mt-4 h-10 w-80 rounded-xl" />
          <Shimmer className="mx-auto mt-3 h-5 w-96 rounded-lg" />
        </div>
        <div className="mt-10 grid items-stretch md:grid-cols-2 rounded-2xl overflow-hidden shadow-lg">
          <Shimmer className="h-50 md:h-120 rounded-none" />
          <div className="flex flex-col gap-4 bg-background/80 p-6 sm:p-8 md:p-10">
            <Shimmer className="h-6 w-28 rounded-full" />
            <Shimmer className="h-8 w-3/4 rounded-lg" />
            <Shimmer className="h-16 w-full rounded-xl" />
            <Shimmer className="h-5 w-2/3 rounded-lg" />
            <Shimmer className="h-5 w-1/2 rounded-lg" />
            <div className="flex gap-3 mt-2">
              <Shimmer className="h-10 w-36 rounded-lg" />
              <Shimmer className="h-10 w-36 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const sectionTitle = (
  <>
    <div className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-4 py-2 text-xs font-semibold text-primary">
      <div className="shrink-0">
        <Image
          src="/images/break.svg"
          alt="Cozy Bakes icon"
          height={20}
          width={20}
        />
      </div>
      <span>Weekly Presence</span>
    </div>
    <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-800 sm:text-4xl">
      Freshly Baked <span className="text-heading-2">Locally Found</span>
    </h2>
    <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-500 sm:text-base">
      We bring the warmth of our oven to local squares across the city.
    </p>
  </>
);

export default function MarketSection() {
  const { data, isLoading } = useUpcomingMarkets();

  if (isLoading) return <MarketSectionSkeleton />;

  const slides = (data?.data ?? []).map(toMarketSlide);

  return (
    <MarketShowcase
      slides={slides}
      dotsBottom="-bottom-15"
      sectionClassName="relative bg-[url('/images/farmer-market-bg.png')] bg-cover bg-center py-20"
      titleClassName="text-center"
      title={sectionTitle}
    />
  );
}

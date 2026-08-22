"use client";

import { Image } from "@/components/ui/app-image";
import MarketShowcase from "@/components/main/market-showcase";
import { Shimmer } from "@/components/ui/shimmer";
import Link from "next/link";
import { ArrowRight, CalendarClock, MapPin } from "lucide-react";
import { useUpcomingMarkets } from "@/hooks";
import type { MarketSlide } from "@/interfaces";
import {
  formatMarketDateRange,
  formatMarketDays,
} from "@/lib/utils/market-date";
import type { UpcomingMarket } from "@/types/main";

function toMarketSlide(market: UpcomingMarket): MarketSlide {
  return {
    image: market.cover_images[0] ?? "/images/farmer-market-bg.png",
    badge: market.tag_label,
    title: market.market_name,
    desc: market.description,
    date: formatMarketDays(market.day),
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
    <section className="relative py-20">
      <Image
        src="/images/farmer-market-bg.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-10">
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

  if (slides.length === 0) {
    return (
      <section className="relative overflow-hidden py-20">
        <Image
          src="/images/farmer-market-bg.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-10">
          <div className="text-center">{sectionTitle}</div>

          <div className="relative isolate mx-auto mt-10 max-w-3xl overflow-hidden rounded-3xl border border-primary/20 bg-background/95 px-6 py-12 text-center shadow-[0_20px_60px_rgba(135,67,6,0.10)] backdrop-blur-sm sm:px-12 sm:py-14">
            <div
              aria-hidden="true"
              className="absolute -left-20 -top-24 -z-10 size-60 rounded-full bg-primary/10 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-28 -right-20 -z-10 size-64 rounded-full bg-secondary/8 blur-3xl"
            />

            <div className="relative mx-auto grid size-20 place-items-center rounded-2xl border border-primary/15 bg-primary/10 text-primary shadow-[0_12px_28px_rgba(209,150,40,0.14)]">
              <CalendarClock
                aria-hidden="true"
                className="size-9"
                strokeWidth={1.7}
              />
              <span className="absolute -bottom-2 -right-2 grid size-8 place-items-center rounded-full border-4 border-background bg-primary text-white">
                <MapPin aria-hidden="true" className="size-4" />
              </span>
            </div>

            <h3 className="mt-6 text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">
              Our next market stop is baking
            </h3>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-500 sm:text-base sm:leading-7">
              We don&apos;t have an upcoming market scheduled just yet. Check
              back soon&mdash;we&apos;ll share our next location and date here.
            </p>

            <Link
              href="/farmers-market"
              className="mt-7 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              Explore Farmers Markets
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <MarketShowcase
      slides={slides}
      dotsBottom="-bottom-15"
      sectionClassName="relative py-20"
      backgroundSrc="/images/farmer-market-bg.png"
      titleClassName="text-center"
      title={sectionTitle}
    />
  );
}


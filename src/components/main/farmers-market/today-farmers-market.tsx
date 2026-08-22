"use client";

import MarketShowcase from "@/components/main/market-showcase";
import { Shimmer } from "@/components/ui/shimmer";
import { Image } from "@/components/ui/app-image";
import type { MarketSlide } from "@/interfaces";
import { CalendarX, MapPin } from "lucide-react";

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
          <h2 className="text-center text-xl font-bold text-heading-2 sm:text-2xl">
            Today&apos;s Markets
          </h2>

          <div className="relative isolate mx-auto mt-10 max-w-3xl overflow-hidden rounded-3xl border border-primary/20 bg-background/95 px-6 py-12 text-center shadow-[0_20px_55px_rgba(135,67,6,0.09)] backdrop-blur-sm sm:px-10 sm:py-14">
            <div
              aria-hidden="true"
              className="absolute -left-20 -top-24 -z-10 size-56 rounded-full bg-primary/10 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-24 -right-16 -z-10 size-60 rounded-full bg-secondary/8 blur-3xl"
            />

            <div className="relative mx-auto grid size-20 place-items-center rounded-full border border-primary/15 bg-primary/10 text-primary shadow-[0_12px_28px_rgba(209,150,40,0.14)]">
              <span className="absolute inset-2 rounded-full border border-dashed border-primary/25" />
              <CalendarX
                aria-hidden="true"
                className="size-9"
                strokeWidth={1.7}
              />
              <span className="absolute -bottom-1 -right-1 grid size-7 place-items-center rounded-full border-4 border-background bg-primary text-white">
                <MapPin aria-hidden="true" className="size-3.5" />
              </span>
            </div>

            <h3 className="mt-6 text-2xl font-semibold tracking-tight text-dark sm:text-3xl">
              No market stops today
            </h3>
            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray sm:text-base sm:leading-7">
              Our ovens are still warm, but we&apos;re not at a local market
              today. Take a look below for our next scheduled stop.
            </p>
          </div>
        </div>
      </section>
    );
  }

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

"use client";

import Image from "next/image";
import MarketShowcase from "@/components/main/market-showcase";
import { marketSlides } from "@/data";

export default function MarketSection() {
  return (
    <MarketShowcase
      slides={marketSlides}
      dotsBottom="-bottom-15"
      sectionClassName="relative bg-[url('/images/farmer-market-bg.png')] bg-cover bg-center py-20"
      titleClassName="text-center"
      title={
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
      }
    />
  );
}

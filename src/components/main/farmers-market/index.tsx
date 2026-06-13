"use client";

import { useMarkets } from "@/hooks/api/farmers-market";
import {
  formatMarketDateRange,
  formatMarketDays,
} from "@/lib/utils/market-date";
import type { UpcomingMarket } from "@/types/main/farmers-market";
import type { MarketSlide } from "@/interfaces";
import FarmersMarketHero from "./farmers-market-hero";
import TodayFarmersMarket from "./today-farmers-market";
import FarmersMarketDays from "./farmers-market-days";

const TODAY_MARKETS_KEY = "today";

export function toMarketSlide(market: UpcomingMarket): MarketSlide {
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
    primaryCtaHref: market.map_link,
    secondaryCta: "Learn More",
  };
}

function FarmersMarket() {
  const { data, isLoading } = useMarkets();
  const grouped = data?.data ?? {};
  const todaySlides = (grouped[TODAY_MARKETS_KEY] ?? []).map(toMarketSlide);
  const otherDays = Object.entries(grouped).filter(
    ([day]) => day !== TODAY_MARKETS_KEY
  );

  return (
    <>
      <FarmersMarketHero />
      <TodayFarmersMarket slides={todaySlides} isLoading={isLoading} />
      <FarmersMarketDays days={otherDays} isLoading={isLoading} />
    </>
  );
}

export default FarmersMarket;

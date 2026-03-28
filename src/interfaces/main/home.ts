import type { ApiProductItem } from "./categories";

export type Slide = {
  videoSrc: string;
  subtitle: string;
  titleA: string;
  highlight: string;
  titleB: string;
  desc: string;
};

export type MarketSlide = {
  image: string;
  badge: string;
  title: string;
  desc: string;
  date: string;
  time: string;
  address: string;
  primaryCta: string;
  secondaryCta: string;
};

export type CategoryItem = {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  desc: string;
};

export type SelectionTab = {
  label: string;
  value: "best" | "new" | "recommended";
};

export type SelectionItem = ApiProductItem & {
  badge?: string;
  desc?: string;
  category?: SelectionTab["value"];
  outOfStock?: boolean;
  actionLabel?: string;
};

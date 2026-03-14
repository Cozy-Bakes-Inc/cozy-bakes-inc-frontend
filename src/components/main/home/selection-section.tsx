"use client";

import { useMemo, useState } from "react";
import { MousePointerClick, ShoppingBag } from "lucide-react";
import type { ApiProductItem, SelectionItem, SelectionTab } from "@/interfaces";
import { cn } from "@/lib/utils";
import { selectionTabs } from "@/data";
import SelectionCard from "@/components/ui/selection-card";
import {
  useBestSellingPreview,
  useProductsPreview,
  useRecommendedProductsPreview,
} from "@/hooks";
import { GridShimmer } from "@/components/ui/shimmer";

const tabBadgeMap: Record<SelectionTab["value"], string> = {
  best: "Best Seller",
  new: "New Arrival",
  recommended: "Recommended",
};

function mapProductsToSelectionItems(
  products: ApiProductItem[],
  category: SelectionTab["value"],
): SelectionItem[] {
  return products.slice(0, 3).map((product, index) => ({
    ...product,
    id: product.id ?? product.slug ?? `${category}-${index}`,
    badge: tabBadgeMap[category],
    category,
    actionLabel: "Add",
  }));
}

export default function SelectionSection() {
  const [activeTab, setActiveTab] = useState(selectionTabs[0]?.value ?? "best");
  const { data: bestSellingData, isLoading: isBestSellingLoading } =
    useBestSellingPreview(activeTab === "best");
  const { data: newArrivalsData, isLoading: isNewArrivalsLoading } =
    useProductsPreview("latest", activeTab === "new");
  const { data: recommendedData, isLoading: isRecommendedLoading } =
    useRecommendedProductsPreview(activeTab === "recommended");
  console.log(bestSellingData?.data?.data);
  const bestSellingItems = useMemo(
    () =>
      mapProductsToSelectionItems(bestSellingData?.data?.data ?? [], "best"),
    [bestSellingData],
  );
  const newArrivalItems = useMemo(
    () => mapProductsToSelectionItems(newArrivalsData?.data?.data ?? [], "new"),
    [newArrivalsData],
  );
  const recommendedItems = useMemo(
    () =>
      mapProductsToSelectionItems(
        recommendedData?.data?.data ?? [],
        "recommended",
      ),
    [recommendedData],
  );

  const filteredItems = useMemo(() => {
    switch (activeTab) {
      case "best":
        return bestSellingItems;
      case "new":
        return newArrivalItems;
      case "recommended":
        return recommendedItems;
      default:
        return [];
    }
  }, [activeTab, bestSellingItems, newArrivalItems, recommendedItems]);

  const isLoading =
    (activeTab === "best" && isBestSellingLoading) ||
    (activeTab === "new" && isNewArrivalsLoading) ||
    (activeTab === "recommended" && isRecommendedLoading);

  return (
    <section className="bg-bg-creamy py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-10">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-4 py-2 text-xs font-semibold text-primary">
            <MousePointerClick className="size-5 shrink-0" />
            <span>Our Selection</span>
          </div>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-dark sm:text-4xl">
            Freshly Baked,{" "}
            <span className="text-heading-2">Thoughtfully Chosen</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-gray sm:text-base">
            A curated collection of best selling and most recommended items.
          </p>
        </div>

        <div className="mt-6 flex justify-center">
          <div className="inline-flex rounded-full bg-background p-1 shadow-sm">
            {selectionTabs.map((tab) => {
              const isActive = tab.value === activeTab;
              return (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => setActiveTab(tab.value)}
                  className={cn(
                    "rounded-full px-5 py-2 text-xs font-semibold transition",
                    isActive
                      ? "bg-primary text-white shadow-sm"
                      : "text-gray hover:text-dark",
                  )}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {isLoading ? (
          <GridShimmer count={3} />
        ) : filteredItems.length > 0 ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item) => (
              <SelectionCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="mt-10 flex min-h-80 items-center justify-center rounded-[2rem] border border-primary/10 bg-[radial-gradient(circle_at_top,rgba(212,158,37,0.18),transparent_40%),linear-gradient(180deg,rgba(255,255,255,0.9),rgba(255,248,235,0.96))] p-8 shadow-sm">
            <div className="max-w-md text-center">
              <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-primary/12 text-primary shadow-inner">
                <ShoppingBag className="size-7" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-dark">
                Nothing baked here yet
              </h3>
              <p className="mt-3 text-sm leading-6 text-gray">
                We could not find products for this tab right now. Try another
                selection or check back in a bit for a fresh batch.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

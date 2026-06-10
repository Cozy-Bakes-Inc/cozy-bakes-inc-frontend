"use client";
import { useMemo } from "react";
import SelectionCard from "@/components/ui/selection-card";
import { GridShimmer } from "@/components/ui/shimmer";
import { useRecommendedProductsPreview } from "@/hooks";
import type { ApiProductItem, SelectionItem } from "@/interfaces";
import { Sparkles } from "lucide-react";

function toSelectionItems(products: ApiProductItem[]): SelectionItem[] {
  return products.map((p) => ({ ...p, actionLabel: "Add" }));
}

export default function ProductRecommendations() {
  const { data, isLoading } = useRecommendedProductsPreview();
  const products = useMemo(
    () => toSelectionItems(data?.data?.data ?? []),
    [data],
  );

  return (
    <section className="bg-bg-creamy py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-10">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-4 py-2 text-xs font-semibold text-primary">
            <Sparkles className="size-5 shrink-0" />
            <span>You May Also Like</span>
          </div>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-dark sm:text-4xl">
            Our Bakery <span className="text-heading-2">Recommendations</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-gray sm:text-base">
            Discover more freshly baked treats, made with care and the finest
            ingredients. Handpicked to perfectly complement your choice and make
            every bite even more delightful.
          </p>
        </div>

        {isLoading ? (
          <GridShimmer count={3} />
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {products.map((item) => (
              <SelectionCard key={item.slug ?? item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

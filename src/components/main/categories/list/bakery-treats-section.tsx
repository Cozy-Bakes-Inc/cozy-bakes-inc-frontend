"use client";

import { Image } from "@/components/ui/app-image";
import { useMemo } from "react";
import SelectionCard from "@/components/ui/selection-card";
import { GridShimmer } from "@/components/ui/shimmer";
import type { ApiProductItem, SelectionItem } from "@/interfaces";
import { useProductsPreview } from "@/hooks";

function mapProductsToSelectionItems(
  products: ApiProductItem[],
): SelectionItem[] {
  return products.map((product) => ({
    ...product,
    id: product.id,
    actionLabel: "Add",
  }));
}

export default function BakeryTreatsSection() {
  const { data, isLoading } = useProductsPreview("random", 6, true);
  const products = useMemo(
    () => mapProductsToSelectionItems(data?.data?.data ?? []),
    [data],
  );

  if (!isLoading && products.length === 0) return null;

  return (
    <section className="bg-bg-creamy py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-10">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/12 px-4 py-2 text-xs font-semibold text-primary">
            <Image src="/images/break.svg" alt="" width={18} height={18} />
            <span>Our Selection</span>
          </div>
          <h2 className="mt-4 text-3xl font-semibold text-dark sm:text-4xl">
            The Bakery Treats{" "}
            <span className="text-heading-2">Everyone Loves Daily</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-gray sm:text-base">
            Discover bestsellers baked every day with love, handmade to bring
            comfort and joy to every bite.
          </p>
        </div>
        {isLoading ? (
          <GridShimmer cardClassName="bg-background" />
        ) : (
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {products.map((item) => (
              <SelectionCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}


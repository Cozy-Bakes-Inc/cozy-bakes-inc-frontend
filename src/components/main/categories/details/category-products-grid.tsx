"use client";

import { useMemo } from "react";
import Link from "next/link";
import SelectionCard from "@/components/ui/selection-card";
import { Button } from "@/components/ui/button";
import { GridShimmer } from "@/components/ui/shimmer";
import type { ApiProductItem } from "@/interfaces";
import { useProductsBySubcategory } from "@/hooks/api/categories";
import { useParams } from "next/navigation";
import Loader from "@/components/ui/loader";

function EmptyProductsState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-6">
      {/* Decorative baked goods illustration */}
      <div className="relative mb-8">
        <div className="flex items-end gap-3">
          {/* Cupcake */}
          <div className="flex flex-col items-center">
            <div className="relative w-10 h-8">
              <div className="absolute inset-x-1 top-0 h-4 rounded-t-full bg-primary/30" />
              <div className="absolute inset-x-0 bottom-0 h-5 rounded-b-sm bg-card/60" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-2 rounded-full bg-secondary/50" />
            </div>
          </div>
          {/* Big cake */}
          <div className="flex flex-col items-center">
            <div className="relative w-20 h-20">
              <div className="absolute inset-x-0 bottom-0 h-14 rounded-b-xl bg-card/50 border-2 border-border/30" />
              <div className="absolute inset-x-2 bottom-14 h-8 rounded-t-xl bg-card/40 border-2 border-border/30 border-b-0" />
              <div className="absolute inset-x-4 bottom-22 h-4 rounded-t-lg bg-primary/25 border border-border/20 border-b-0" />
              {/* Candles */}
              <div className="absolute bottom-21 left-5 w-1 h-3 bg-secondary/60 rounded-full" />
              <div className="absolute bottom-21 left-1/2 -translate-x-1/2 w-1 h-3 bg-secondary/60 rounded-full" />
              <div className="absolute bottom-21 right-5 w-1 h-3 bg-secondary/60 rounded-full" />
              {/* Flames */}
              <div className="absolute bottom-24 left-4.5 w-1.5 h-2 rounded-full bg-primary/70 animate-pulse" />
              <div
                className="absolute bottom-24 left-1/2 -translate-x-1/2 w-1.5 h-2 rounded-full bg-primary/70 animate-pulse"
                style={{ animationDelay: "0.3s" }}
              />
              <div
                className="absolute bottom-24 right-4.5 w-1.5 h-2 rounded-full bg-primary/70 animate-pulse"
                style={{ animationDelay: "0.6s" }}
              />
              {/* Decorative dots */}
              <div className="absolute bottom-4 inset-x-2 flex justify-around">
                <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                <div className="w-1.5 h-1.5 rounded-full bg-secondary/50" />
                <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                <div className="w-1.5 h-1.5 rounded-full bg-secondary/50" />
              </div>
            </div>
          </div>
          {/* Cookie */}
          <div className="flex flex-col items-center">
            <div className="relative w-10 h-10 rounded-full bg-card/50 border-2 border-border/30">
              <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-chocolate/30" />
              <div className="absolute top-3 right-2 w-1.5 h-1.5 rounded-full bg-chocolate/30" />
              <div className="absolute bottom-2 left-3 w-1.5 h-1.5 rounded-full bg-chocolate/30" />
            </div>
          </div>
        </div>
        {/* Sparkles */}
        <div
          className="absolute -top-2 -right-2 text-primary/60 text-lg animate-bounce"
          style={{ animationDelay: "0.2s" }}
        >
          ✦
        </div>
        <div
          className="absolute -top-4 left-4 text-secondary/40 text-sm animate-bounce"
          style={{ animationDelay: "0.5s" }}
        >
          ✦
        </div>
        <div
          className="absolute top-0 -left-4 text-primary/30 text-xs animate-bounce"
          style={{ animationDelay: "0.8s" }}
        >
          ✦
        </div>
      </div>

      {/* Text content */}
      <div className="text-center max-w-sm">
        <h3 className="text-2xl font-bold text-chocolate mb-2 tracking-tight">
          Something Delicious Is Coming
        </h3>
        <p className="text-warm-brown/80 text-sm leading-relaxed mb-1">
          Our bakers are hard at work crafting something special for this
          collection.
        </p>
        <p className="text-warm-brown/60 text-sm mb-8">
          Check back soon — good things take time!
        </p>

        {/* Divider with dots */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="h-px w-12 bg-border/50" />
          <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
          <div className="w-1.5 h-1.5 rounded-full bg-card" />
          <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
          <div className="h-px w-12 bg-border/50" />
        </div>

        <Link href="/categories">
          <Button className="rounded-full bg-primary px-8 py-2 text-sm font-semibold text-white hover:bg-primary/90 shadow-sm">
            Explore Other Categories
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default function CategoryProductsGrid() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const {
    data: productsData,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading: isProductsLoading,
  } = useProductsBySubcategory(slug);

  const products: ApiProductItem[] = useMemo(
    () => productsData?.pages?.flatMap((page) => page?.data?.data ?? []) ?? [],
    [productsData],
  );

  return (
    <section className="bg-bg-creamy py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-10">
        {isProductsLoading ? (
          <GridShimmer count={3} cardClassName="bg-background" />
        ) : products.length === 0 ? (
          <EmptyProductsState />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <SelectionCard key={product.id} item={product} />
            ))}
          </div>
        )}

        {hasNextPage ? (
          <div className="mt-8 flex justify-center">
            <Button
              type="button"
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className="rounded-full bg-background px-6 text-xs font-semibold text-dark hover:bg-background/90"
            >
              {isFetchingNextPage ? (
                <>
                  <Loader /> Loading Products...
                </>
              ) : (
                "Load More Products"
              )}
            </Button>
          </div>
        ) : null}
      </div>
    </section>
  );
}

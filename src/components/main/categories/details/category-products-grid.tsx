"use client";

import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SelectionCard from "@/components/ui/selection-card";
import { Button } from "@/components/ui/button";
import { GridShimmer } from "@/components/ui/shimmer";
import type { ApiProductItem } from "@/interfaces";
import { useProductsBySubcategory } from "@/hooks/api/categories";
import { useParams } from "next/navigation";

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
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence mode="popLayout" initial={false}>
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 14, scale: 0.985 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.985 }}
                  transition={{
                    opacity: {
                      duration: 0.25,
                      delay: index * 0.02,
                      ease: "easeOut",
                    },
                    y: { type: "spring", stiffness: 280, damping: 26 },
                    scale: { duration: 0.2, ease: "easeOut" },
                    layout: { type: "spring", stiffness: 280, damping: 30 },
                  }}
                >
                  <SelectionCard item={product} />
                </motion.div>
              ))}
            </AnimatePresence>
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
              {isFetchingNextPage
                ? "Loading products..."
                : "Load More Products"}
            </Button>
          </div>
        ) : null}
      </div>
    </section>
  );
}

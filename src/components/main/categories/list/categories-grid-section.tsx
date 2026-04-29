"use client";

import { useMemo } from "react";
import CategoryCard from "@/components/ui/category-card";
import type { SubcategoryItem } from "@/interfaces/main/categories";
import { Button } from "@/components/ui/button";
import { GridShimmer } from "@/components/ui/shimmer";
import { AnimatePresence, motion } from "framer-motion";
import { useSubcategories } from "@/hooks/api/categories";

export default function CategoriesGridSection() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useSubcategories();

  const subcategories: SubcategoryItem[] = useMemo(
    () => data?.pages?.flatMap((page) => page?.data?.data ?? []) ?? [],
    [data],
  );

  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-10">
        {isLoading ? (
          <GridShimmer count={3} className="mt-0 rounded-4xl" />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout" initial={false}>
              {subcategories.map((item, index) => (
                <motion.div
                  key={item.id}
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
                  <CategoryCard
                    item={{
                      id: item.id,
                      image: item.image,
                      title: item.title,
                      subtitle: "",
                      desc: item.description,
                      href: `/categories/${item.slug}`,
                      footerLabel: item.products_count,
                    }}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {hasNextPage ? (
          <div className="mt-10 flex justify-center">
            <Button
              type="button"
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className="rounded-full bg-bg-creamy px-6 text-xs font-semibold text-dark hover:bg-bg-creamy/90"
            >
              {isFetchingNextPage
                ? "Loading subcategories..."
                : "Load More Subcategories"}
            </Button>
          </div>
        ) : null}
      </div>
    </section>
  );
}

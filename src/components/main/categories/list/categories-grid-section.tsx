"use client";

import { useMemo } from "react";
import CategoryCard from "@/components/ui/category-card";
import type { SubcategoryItem } from "@/interfaces/main/categories";
import { Button } from "@/components/ui/button";
import { GridShimmer } from "@/components/ui/shimmer";
import { useSubcategories } from "@/hooks/api/categories";
import Loader from "@/components/ui/loader";

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
            {subcategories.map((item) => (
              <CategoryCard
                key={item.id}
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
            ))}
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
              {isFetchingNextPage ? (
                <>
                  <Loader /> Loading Categories...
                </>
              ) : (
                "Load More Categories"
              )}
            </Button>
          </div>
        ) : null}
      </div>
    </section>
  );
}

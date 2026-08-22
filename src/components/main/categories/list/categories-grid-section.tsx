"use client";

import { useMemo } from "react";
import CategoryCard from "@/components/ui/category-card";
import type { SubcategoryItem } from "@/interfaces/main/categories";
import { Button } from "@/components/ui/button";
import { GridShimmer } from "@/components/ui/shimmer";
import { useSubcategories } from "@/hooks/api/categories";
import Loader from "@/components/ui/loader";
import { CakeSlice, Sparkles } from "lucide-react";

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
        ) : subcategories.length > 0 ? (
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
        ) : (
          <div className="relative isolate overflow-hidden rounded-4xl border border-primary/20 bg-bg-creamy px-6 py-16 text-center shadow-[0_20px_55px_rgba(135,67,6,0.06)] sm:px-10 sm:py-20">
            <div
              aria-hidden="true"
              className="absolute -left-16 -top-20 -z-10 size-52 rounded-full bg-primary/8 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-24 -right-16 -z-10 size-64 rounded-full bg-secondary/8 blur-3xl"
            />

            <div className="relative mx-auto grid size-24 place-items-center rounded-full border border-primary/15 bg-white shadow-[0_14px_35px_rgba(135,67,6,0.10)]">
              <span className="absolute inset-2 rounded-full border border-dashed border-primary/25" />
              <CakeSlice
                aria-hidden="true"
                className="size-10 text-primary"
                strokeWidth={1.6}
              />
              <span className="absolute -right-1 top-0 grid size-8 place-items-center rounded-full bg-primary text-white shadow-md">
                <Sparkles aria-hidden="true" className="size-4" />
              </span>
            </div>

            <h2 className="mt-7 text-2xl font-semibold tracking-tight text-dark sm:text-3xl">
              Fresh categories are on the way
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray sm:text-base sm:leading-7">
              We&apos;re preparing something delicious for you. Please check
              back soon to explore our latest bakes and treats.
            </p>

            <div
              aria-hidden="true"
              className="mx-auto mt-7 flex w-fit items-center gap-2"
            >
              <span className="size-1.5 rounded-full bg-primary/35" />
              <span className="h-1.5 w-8 rounded-full bg-primary/70" />
              <span className="size-1.5 rounded-full bg-primary/35" />
            </div>
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

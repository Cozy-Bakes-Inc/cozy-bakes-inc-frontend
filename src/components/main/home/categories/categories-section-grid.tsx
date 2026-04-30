"use client";

import CategoryCard from "@/components/ui/category-card";
import { GridShimmer } from "@/components/ui/shimmer";
import type { SubcategoryItem } from "@/interfaces/main/categories";
import Image from "next/image";

type CategoriesSectionGridProps = {
  items: SubcategoryItem[];
  isLoading: boolean;
  shimmerCount?: number;
};

export default function CategoriesSectionGrid({
  items,
  isLoading,
  shimmerCount = 3,
}: CategoriesSectionGridProps) {
  if (isLoading) {
    return <GridShimmer count={shimmerCount} cardClassName="rounded-4xl" />;
  }

  if (!items.length) {
    return (
      <div className="mt-10 overflow-hidden rounded-[2rem] border border-primary/10 bg-[radial-gradient(circle_at_top,rgba(212,158,37,0.16),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.96),rgba(255,248,235,0.98))] shadow-sm">
        <div className="grid items-center gap-8 px-6 py-8 sm:px-8 lg:grid-cols-[minmax(0,280px)_1fr] lg:px-10">
          <div className="relative mx-auto aspect-square w-full max-w-56">
            <div className="absolute inset-0 rounded-full bg-primary/10 blur-3xl" />
            <Image
              src="/images/categories.svg"
              alt="Categories illustration"
              fill
              className="relative object-contain"
            />
          </div>

          <div className="text-center lg:text-left">
            <span className="inline-flex rounded-full bg-primary/12 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
              Fresh Picks Soon
            </span>
            <h3 className="mt-4 text-2xl font-semibold text-dark sm:text-3xl">
              New bakery categories are warming up
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-gray sm:text-base">
              We are preparing more delicious sections for you. Check back in a
              little while and you should find fresh collections here.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10 grid animate-in gap-6 fade-in slide-in-from-bottom-6 duration-700 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <CategoryCard
          key={item.id}
          item={{
            id: item.id,
            image: item.image,
            title: item.title,
            subtitle: item.parent_category,
            desc: item.description,
            href: `/categories/${item.slug}`,
            eyebrow: item.parent_category,
            footerLabel: item.products_count,
          }}
        />
      ))}
    </div>
  );
}

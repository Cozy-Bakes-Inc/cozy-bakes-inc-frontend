"use client";

import CategoryCard from "@/components/ui/category-card";
import { GridShimmer } from "@/components/ui/shimmer";
import type { SubcategoryItem } from "@/interfaces/main/categories";

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
    return <GridShimmer count={shimmerCount} />;
  }

  if (!items.length) {
    return (
      <div className="mt-10 text-center text-sm text-gray">
        No categories found.
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

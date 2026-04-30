"use client";

import CategoryCard from "@/components/ui/category-card";
import type { SubcategoryItem } from "@/interfaces/main/categories";

type SubcategoryCardProps = {
  item: SubcategoryItem;
};

export default function SubcategoryCard({ item }: SubcategoryCardProps) {
  return (
    <CategoryCard
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
  );
}

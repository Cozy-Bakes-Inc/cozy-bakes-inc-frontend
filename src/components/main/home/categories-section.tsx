"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useSubcategories } from "@/hooks/api/categories";
import type { SubcategoryItem } from "@/interfaces/main/categories";
import CategoriesSectionGrid from "./categories-section-grid";
import CategoriesSectionHeader from "./categories-section-header";

export default function CategoriesSection() {
  const { data, isLoading } = useSubcategories();

  const subcategories: SubcategoryItem[] =
    data?.pages?.flatMap((page) => page?.data?.data ?? []) ?? [];

  return (
    <section className="relative overflow-x-hidden bg-background py-20">
      <div className="pointer-events-none absolute -left-10 top-10 hidden size-32 rounded-full border border-primary/20 sm:block" />
      <div className="pointer-events-none absolute -right-12 bottom-10 hidden size-36 rounded-full border border-primary/20 sm:block" />

      <div className="mx-auto max-w-7xl px-5 sm:px-10">
        <CategoriesSectionHeader />
        <CategoriesSectionGrid items={subcategories} isLoading={isLoading} />

        <div className="mt-10 flex justify-center animate-in fade-in slide-in-from-bottom-6 duration-700">
          <Link
            href="/categories"
            className="h-10 flex gap-1 items-center justify-center rounded-full bg-primary px-4 text-xs font-semibold text-white hover:bg-primary/90"
          >
            Explore More Categories
            <ArrowRight className="size-4 shrink-0" />
          </Link>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import CategoryCard from "@/components/ui/category-card";
import type {
  ApiCategoryItem,
  CategorySubcategoryItem,
} from "@/interfaces/main/categories";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import { Button } from "@/components/ui/button";
import { GridShimmer } from "@/components/ui/shimmer";
import { AnimatePresence, motion } from "framer-motion";
import {
  useCategories,
  useCategorySubcategories,
} from "@/hooks/api/categories";

export default function CategoriesGridSection() {
  const [selectedCategorySlug, setSelectedCategorySlug] = useState("");

  const {
    data: categoriesData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isCategoriesLoading,
  } = useCategories();

  const categories: ApiCategoryItem[] = useMemo(
    () =>
      categoriesData?.pages?.flatMap((page) => page?.data?.data ?? []) ?? [],
    [categoriesData],
  );

  const activeCategorySlug = useMemo(() => {
    if (!categories.length) {
      return "";
    }

    const hasSelectedCategory = categories.some(
      (category) => category.slug === selectedCategorySlug,
    );

    return hasSelectedCategory ? selectedCategorySlug : categories[0].slug;
  }, [categories, selectedCategorySlug]);

  const activeCategory =
    categories.find((category) => category.slug === activeCategorySlug) ?? null;

  const { data: subcategoriesData, isLoading: isSubcategoriesLoading } =
    useCategorySubcategories(activeCategorySlug);
  const visibleCards: CategorySubcategoryItem[] =
    subcategoriesData?.pages?.flatMap(
      (page) => page?.data?.category?.sub_categories?.data ?? [],
    ) ?? [];
  const filters = useMemo(
    () =>
      categories.map((category) => ({
        label: category.title,
        value: category.slug,
      })),
    [categories],
  );

  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-10">
        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {isCategoriesLoading ? (
            <GridShimmer
              count={3}
              className="flex gap-2"
              cardClassName="h-10 w-32 rounded-full"
            />
          ) : (
            <div className="rounded-[999px] border border-[#e3c98a] bg-[#f7f4ee] p-1.5 md:mx-auto md:w-fit md:max-w-full">
              <Swiper
                modules={[FreeMode]}
                slidesPerView="auto"
                spaceBetween={10}
                freeMode
                centerInsufficientSlides
                className="w-full max-w-full px-0!"
              >
                {filters.map((filter) => {
                  const isActive = activeCategorySlug === filter.value;
                  return (
                    <SwiperSlide key={filter.value} className="w-auto!">
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => setSelectedCategorySlug(filter.value)}
                        className={cn(
                          "h-auto shrink-0 rounded-full px-5 py-2.5 text-xs font-semibold text-[#7a5a3a] transition hover:bg-transparent hover:text-secondary md:px-8",
                          isActive
                            ? "bg-[#d89d2e] text-white hover:bg-[#d89d2e] hover:text-white"
                            : "bg-transparent",
                        )}
                      >
                        {filter.label}
                      </Button>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          )}
        </motion.div>

        {hasNextPage ? (
          <div className="mt-6 flex justify-center">
            <Button
              type="button"
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className="rounded-full bg-bg-creamy px-6 text-xs font-semibold text-dark hover:bg-bg-creamy/90"
            >
              {isFetchingNextPage
                ? "Loading categories..."
                : "Load More Categories"}
            </Button>
          </div>
        ) : null}

        {isSubcategoriesLoading ? (
          <GridShimmer count={3} />
        ) : (
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout" initial={false}>
              {visibleCards.map((item, index) => (
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
                      subtitle: activeCategory?.title ?? "",
                      desc: item.description,
                      href: `/categories/${item.slug}`,
                      eyebrow: activeCategory?.title ?? "",
                    }}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}

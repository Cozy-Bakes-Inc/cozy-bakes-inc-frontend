"use client";

import CategoryCard from "@/components/ui/category-card";
import { Shimmer } from "@/components/ui/shimmer";
import type { CategoryCardItem, SubcategoryItem } from "@/interfaces";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import Image from "next/image";
import { breakpoints } from "@/data";
import { useSubcategoriesPreview } from "@/hooks";
import { useMemo } from "react";

function mapSubcategoryToCard(item: SubcategoryItem): CategoryCardItem {
  return {
    id: item.id,
    image: item.image,
    title: item.title,
    subtitle: item.parent_category,
    desc: item.description,
    href: `/categories/${item.slug}`,
    footerLabel: item.products_count,
  };
}

export default function ExploreMoreCategories() {
  const { data, isLoading } = useSubcategoriesPreview();
  const subcategories = useMemo(
    () => (data?.data?.data ?? []).map(mapSubcategoryToCard),
    [data],
  );

  if (!isLoading && subcategories.length === 0) return null;

  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-10">
        <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-4 py-2 text-xs font-semibold text-primary">
            <div className="shrink-0">
              <Image
                src="/images/categories.svg"
                alt="beard"
                height={20}
                width={20}
              />
            </div>
            <span> Explore More</span>
          </div>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-dark sm:text-4xl">
            Explore Our Other{" "}
            <span className="text-heading-2">Bakery Delights</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-gray sm:text-base">
            From daily breads to handcrafted pastries and special orders, our
            categories are thoughtfully baked to suit every taste and moment.A
            carefully crafted range of bakery favorites
          </p>
        </div>
        <Swiper
          modules={[FreeMode, Autoplay]}
          slidesPerView={1}
          spaceBetween={16}
          freeMode
          grabCursor
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          className="mt-10 pb-6"
          breakpoints={breakpoints}
        >
          {isLoading
            ? Array.from({ length: 3 }).map((_, index) => (
                <SwiperSlide key={index} className="h-auto!">
                  <Shimmer className="h-80 w-full rounded-4xl bg-bg-creamy" />
                </SwiperSlide>
              ))
            : subcategories.map((item) => (
                <SwiperSlide key={item.id} className="h-auto!">
                  <CategoryCard item={item} />
                </SwiperSlide>
              ))}
        </Swiper>
      </div>
    </section>
  );
}

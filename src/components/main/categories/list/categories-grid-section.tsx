"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import CategoryCard from "@/components/ui/category-card";
import type { CategoryItem } from "@/interfaces";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";

type CategoryFilter = {
  label: string;
  value: "bakery" | "gluten-free" | "farmers" | "vetris";
};

type CategoryCardItem = CategoryItem & {
  category: CategoryFilter["value"] | "all";
};

const filters: CategoryFilter[] = [
  { label: "Bakery Product", value: "bakery" },
  { label: "Gluten-Free Product", value: "gluten-free" },
  { label: "Farmers Product", value: "farmers" },
  { label: "Vetri's Product", value: "vetris" },
];

const cards: CategoryCardItem[] = [
  {
    id: "breads",
    title: "Breads",
    subtitle: "Explore Collection",
    image: "/images/artisan-sourdough.jpg",
    desc: "Artisan sourdough and handcrafted daily loaves.",
    category: "bakery",
  },
  {
    id: "croissants",
    title: "Croissants & Pastries",
    subtitle: "Explore Collection",
    image: "/images/chocolate-croissant.jpg",
    desc: "Flaky, buttery pastries baked fresh every morning.",
    category: "bakery",
  },
  {
    id: "cakes",
    title: "Cakes & Desserts",
    subtitle: "Explore Collection",
    image: "/images/vanilla-bean-cake.jpg",
    desc: "Celebration cakes and rich homemade desserts.",
    category: "bakery",
  },
  {
    id: "cookies",
    title: "Cookies & Biscuits",
    subtitle: "Explore Collection",
    image: "/images/triple-chocolate-cookies.png",
    desc: "Crunchy cookies and soft biscuits for every bite.",
    category: "gluten-free",
  },
  {
    id: "donuts",
    title: "Donuts",
    subtitle: "Explore Collection",
    image: "/images/cinnamon-rolls.jpg",
    desc: "Soft donuts and sweet rings with seasonal glazes.",
    category: "gluten-free",
  },
  {
    id: "savory-bakery",
    title: "Savory Bakery",
    subtitle: "Explore Collection",
    image: "/images/french-baguette.jpg",
    desc: "Savory loaves and bakery favorites for lunch and dinner.",
    category: "farmers",
  },
  {
    id: "savory",
    title: "Savory",
    subtitle: "Explore Collection",
    image: "/images/farmer-market-1.png",
    desc: "Market-style savory bakes and handcrafted specialties.",
    category: "farmers",
  },
  {
    id: "specialty-rolls",
    title: "Specialty Rolls",
    subtitle: "Explore Collection",
    image: "/images/cinnamon-rolls.jpg",
    desc: "Soft signature rolls with custom fillings and toppings.",
    category: "vetris",
  },
  {
    id: "danish-rolls",
    title: "Danish Rolls",
    subtitle: "Explore Collection",
    image: "/images/vanilla-bean-cake.jpg",
    desc: "Layered Danish rolls with creamy and fruity flavors.",
    category: "vetris",
  },
];

export default function CategoriesGridSection() {
  const [activeFilter, setActiveFilter] =
    useState<CategoryFilter["value"]>("bakery");

  const visibleCards = useMemo(
    () =>
      activeFilter === "bakery"
        ? cards
        : cards.filter((item) => item.category === activeFilter),
    [activeFilter],
  );

  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-10">
        <motion.div
          className="hidden md:flex md:justify-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex w-max items-center gap-2 rounded-full border border-primary/25 bg-background p-1.5">
            {filters.map((filter) => {
              const isActive = activeFilter === filter.value;
              return (
                <Button
                  key={filter.value}
                  type="button"
                  variant="ghost"
                  onClick={() => setActiveFilter(filter.value)}
                  className={cn(
                    "h-auto shrink-0 rounded-full px-6 py-2 text-xs font-semibold transition",
                    isActive
                      ? "bg-primary text-white shadow-sm"
                      : "text-taupe-brown hover:text-secondary",
                  )}
                >
                  {filter.label}
                </Button>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          className="md:hidden"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <Swiper
            modules={[FreeMode]}
            slidesPerView="auto"
            spaceBetween={8}
            freeMode
            className="px-0! pb-2!"
          >
            {filters.map((filter) => {
              const isActive = activeFilter === filter.value;
              return (
                <SwiperSlide key={filter.value} className="w-auto!">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setActiveFilter(filter.value)}
                    className={cn(
                      "h-auto shrink-0 rounded-full border border-primary/25 bg-background px-4 py-2 text-xs font-semibold transition",
                      isActive
                        ? "bg-primary text-white shadow-sm"
                        : "text-taupe-brown hover:text-secondary",
                    )}
                  >
                    {filter.label}
                  </Button>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </motion.div>
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
                <CategoryCard item={item} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

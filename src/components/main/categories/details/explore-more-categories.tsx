"use client";

import CategoryCard from "@/components/ui/category-card";
import type { CategoryItem } from "@/interfaces";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import Image from "next/image";
import { breakpoints } from "@/data";

const cards: CategoryItem[] = [
  {
    id: "breads",
    title: "Breads",
    subtitle: "Explore Collection",
    image: "/images/artisan-sourdough.jpg",
    desc: "Artisan sourdough and handcrafted daily loaves.",
  },
  {
    id: "croissants",
    title: "Croissants & Pastries",
    subtitle: "Explore Collection",
    image: "/images/chocolate-croissant.jpg",
    desc: "Flaky, buttery pastries baked fresh every morning.",
  },
  {
    id: "cakes",
    title: "Cakes & Desserts",
    subtitle: "Explore Collection",
    image: "/images/vanilla-bean-cake.jpg",
    desc: "Celebration cakes and rich homemade desserts.",
  },
  {
    id: "cookies",
    title: "Cookies & Biscuits",
    subtitle: "Explore Collection",
    image: "/images/triple-chocolate-cookies.png",
    desc: "Crunchy cookies and soft biscuits for every bite.",
  },
  {
    id: "donuts",
    title: "Donuts",
    subtitle: "Explore Collection",
    image: "/images/cinnamon-rolls.jpg",
    desc: "Soft donuts and sweet rings with seasonal glazes.",
  },
  {
    id: "savory-bakery",
    title: "Savory Bakery",
    subtitle: "Explore Collection",
    image: "/images/french-baguette.jpg",
    desc: "Savory loaves and bakery favorites for lunch and dinner.",
  },
  {
    id: "savory",
    title: "Savory",
    subtitle: "Explore Collection",
    image: "/images/farmer-market-1.png",
    desc: "Market-style savory bakes and handcrafted specialties.",
  },
  {
    id: "specialty-rolls",
    title: "Specialty Rolls",
    subtitle: "Explore Collection",
    image: "/images/cinnamon-rolls.jpg",
    desc: "Soft signature rolls with custom fillings and toppings.",
  },
  {
    id: "danish-rolls",
    title: "Danish Rolls",
    subtitle: "Explore Collection",
    image: "/images/vanilla-bean-cake.jpg",
    desc: "Layered Danish rolls with creamy and fruity flavors.",
  },
];

export default function ExploreMoreCategories() {
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
            Explore Our Other,{" "}
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
          {cards.map((item) => (
            <SwiperSlide key={item.id} className="h-auto!">
              <CategoryCard item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

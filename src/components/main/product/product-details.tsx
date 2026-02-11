"use client";

import Image from "next/image";
import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Counter from "@/components/ui/counter";
import RatingStars from "@/components/ui/rating-stars";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useCartStore } from "@/store/cart-store";

export default function ProductDetails() {
  const [quantity, setQuantity] = useState(1);
  const handleCounter = (value: number) => setQuantity(value);
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);

  const product = {
    id: "sourdough-bread",
    title: "Sourdough Bread",
    price: 8.5,
    image: "/images/artisan-sourdough.jpg",
  };

  const images = [
    {
      src: "/images/artisan-sourdough.jpg",
      alt: "Sourdough bread",
    },
    {
      src: "/images/vanilla-bean-cake.jpg",
      alt: "Vanilla bean cake",
    },
    {
      src: "/images/chocolate-croissant.jpg",
      alt: "Chocolate croissant",
    },
  ];
  return (
    <section className="bg-bg-creamy py-12 sm:py-16">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-10 lg:grid-cols-2 lg:items-stretch">
        <div className="overflow-hidden rounded-3xl shadow-sm h-full">
          <Swiper
            modules={[Autoplay]}
            slidesPerView={1}
            spaceBetween={16}
            grabCursor
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            speed={600}
            loop
            className="h-full w-full"
          >
            {images.map((image) => (
              <SwiperSlide key={image.src} className="relative h-full w-full">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                  priority
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="rounded-3xl bg-background p-6 shadow-sm sm:p-8 h-full">
          <div className="space-y-5">
            <h1 className="text-3xl font-semibold tracking-tight text-secondary sm:text-4xl">
              {product.title}
            </h1>
            <p className="text-sm leading-7 text-gray sm:text-base">
              Expertly handcrafted through slow natural fermentation, our
              sourdough delivers a refined balance of deep flavor and delicate
              texture. Baked fresh daily for an authentic artisan experience.
            </p>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-end gap-2">
                <p className="text-2xl font-semibold text-primary">
                  ${product.price.toFixed(2)}
                </p>
                <span className="text-xs text-gray">For one piece</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-secondary">
                <RatingStars value={4.8} />
                <span className="text-gray">(4.8)</span>
              </div>
            </div>

            <div className="rounded-2xl border border-secondary/10 bg-bg-creamy px-4 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-card">
                Freshness Guarantee
              </p>
              <p className="mt-1 text-xs leading-5 text-gray">
                Carefully baked fresh every morning to preserve flavor and
                quality. For the best experience, enjoy within 3 days.
              </p>
            </div>

            <div className="flex items-center justify-between gap-4">
              <h5 className="text-sm font-semibold text-dark">Quantity:</h5>
              <Counter
                value={quantity}
                onChange={handleCounter}
                min={1}
                max={9}
              />
            </div>

            <Button
              className="h-11 w-full rounded-full bg-primary px-6 text-sm font-semibold text-white hover:bg-card/90"
              onClick={() => {
                addItem({ ...product, quantity });
                openCart();
              }}
            >
              <ShoppingCart className="size-4" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

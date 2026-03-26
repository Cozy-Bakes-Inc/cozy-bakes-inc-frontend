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
import type { ApiProductItem } from "@/interfaces";

type ProductDetailsProps = {
  product?: ApiProductItem;
};

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1);
  const handleCounter = (value: number) => setQuantity(value);
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);

  const productTitle = product?.title ?? "Product";
  const productDescription =
    product?.description ?? "No description available.";
  const originalPrice = Number(product?.price ?? 0);
  const productPrice = Number(product?.final_price ?? product?.price ?? 0);
  const productRating = Number(product?.rating ?? 0);
  const productFreshness =
    product?.freshness_guarantee ??
    "Freshness information is not available for this product.";
  const images = product?.images?.length
    ? product.images.map((src, index) => ({
        src,
        alt: `${productTitle} image ${index + 1}`,
      }))
    : [
        {
          src: product?.image || "/images/artisan-sourdough.jpg",
          alt: productTitle,
        },
      ];

  const cartProduct = {
    id: String(product?.slug ?? product?.id ?? productTitle),
    slug: product?.slug,
    title: productTitle,
    price: productPrice,
    image: images[0]?.src ?? "",
  };

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
              {productTitle}
            </h1>
            <p className="text-sm leading-7 text-gray sm:text-base">
              {productDescription}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-end gap-2">
                <p className="text-2xl font-semibold text-primary">
                  ${productPrice.toFixed(2)}
                </p>
                {originalPrice > productPrice ? (
                  <span className="text-sm font-medium text-[#F04438] line-through">
                    ${originalPrice.toFixed(2)}
                  </span>
                ) : null}
                <span className="text-xs text-gray">For one piece</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-secondary">
                <RatingStars value={productRating} />
                <span className="text-gray">({productRating.toFixed(1)})</span>
              </div>
            </div>

            <div className="rounded-2xl border border-secondary/10 bg-bg-creamy px-4 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-card">
                Freshness Guarantee
              </p>
              <p className="mt-1 text-xs leading-5 text-gray">
                {productFreshness}
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
                addItem({ ...cartProduct, quantity });
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

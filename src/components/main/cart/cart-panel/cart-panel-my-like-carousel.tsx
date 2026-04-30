"use client";

import { useMemo, useRef } from "react";
import Image from "next/image";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { useRecommendedProductsPreview } from "@/hooks";
import type { ApiProductItem } from "@/interfaces";
import type { CartItem } from "@/store/cart-store";

type AddCartItemInput = {
  id: string;
  title: string;
  image: string;
  price: number;
  quantity?: number;
};

type CartPanelMyLikeCarouselProps = {
  items: CartItem[];
  onAddItem: (item: AddCartItemInput) => void;
};

function getProductPrice(product: ApiProductItem) {
  const rawPrice = product.final_price ?? product.price;
  const parsedPrice =
    typeof rawPrice === "number" ? rawPrice : Number(rawPrice ?? 0);

  return Number.isFinite(parsedPrice) ? parsedPrice : 0;
}

function mapProductToRecommendation(product: ApiProductItem) {
  return {
    id: String(product.id),
    title: product.title,
    image: product.image || "/images/artisan-sourdough.jpg",
    price: getProductPrice(product),
    description: product.description ?? "Freshly baked and ready to order.",
  };
}

export default function CartPanelMyLikeCarousel({
  items,
  onAddItem,
}: CartPanelMyLikeCarouselProps) {
  const swiperRef = useRef<SwiperType | null>(null);
  const { data, isLoading } = useRecommendedProductsPreview();
  const recommendations = useMemo(
    () => (data?.data?.data ?? []).map(mapProductToRecommendation),
    [data],
  );
  const myLikeItems = useMemo(() => {
    const filtered = recommendations.filter(
      (recommendation) => !items.some((item) => item.id === recommendation.id),
    );
    return filtered;
  }, [items, recommendations]);

  if (isLoading || myLikeItems.length === 0) return null;

  return (
    <div className="rounded-2xl border border-border/24 bg-bg-creamy p-2.5">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-dark sm:text-sm">
          Recommended For You
        </p>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => swiperRef.current?.slidePrev()}
            className="grid size-5 place-items-center text-gray"
            aria-label="Previous recommendation"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => swiperRef.current?.slideNext()}
            className="grid size-5 place-items-center text-primary"
            aria-label="Next recommendation"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>

      <div className="mt-2 border-t border-border/24 pt-2">
        <Swiper
          slidesPerView={1}
          spaceBetween={8}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          className="w-full"
        >
          {myLikeItems.map((recommendation) => (
            <SwiperSlide key={recommendation.id}>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <div className="relative size-16.5 shrink-0 overflow-hidden rounded-lg">
                    <Image
                      src={recommendation.image}
                      alt={recommendation.title}
                      fill
                      sizes="66px"
                      className="object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium leading-5 text-dark sm:text-base sm:leading-6">
                      {recommendation.title}
                    </p>
                    <p className="line-clamp-2 text-[11px] leading-[1.4] text-gray-500 sm:text-xs sm:leading-normal">
                      {recommendation.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.06em] text-[#6B5844] sm:text-[11px]">
                      Price
                    </p>
                    <p className="text-sm font-medium leading-5 text-primary sm:text-base sm:leading-6">
                      ${recommendation.price.toFixed(2)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      onAddItem({
                        id: recommendation.id,
                        title: recommendation.title,
                        price: recommendation.price,
                        image: recommendation.image,
                        quantity: 1,
                      })
                    }
                    className="h-7 rounded-full bg-primary px-3 text-[11px] font-medium text-white sm:h-8 sm:px-4 sm:text-xs"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

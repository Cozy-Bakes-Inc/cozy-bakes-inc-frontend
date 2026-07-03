"use client";

import { useMemo, useRef } from "react";
import { Image } from "@/components/ui/app-image";
import Link from "next/link";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";

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
  const parsed =
    typeof rawPrice === "number" ? rawPrice : Number(rawPrice ?? 0);
  if (Number.isFinite(parsed) && parsed > 0) return parsed;

  const perUnit = product.prices?.per_unit;
  if (perUnit && perUnit.length > 0) {
    const unitPrice = perUnit[0].price ?? perUnit[0].value;
    const unitParsed =
      typeof unitPrice === "number" ? unitPrice : Number(unitPrice ?? 0);
    if (Number.isFinite(unitParsed) && unitParsed > 0) return unitParsed;
  }

  return 0;
}

function formatPrice(price: number) {
  return `$${price.toFixed(2)}`;
}

function mapProductToRecommendation(product: ApiProductItem) {
  const images = [product.image, ...(product.images ?? [])].filter(
    (img): img is string => Boolean(img),
  );
  const uniqueImages =
    images.length > 0
      ? Array.from(new Set(images))
      : ["/images/artisan-sourdough.jpg"];

  return {
    id: String(product.id),
    slug: product.slug,
    title: product.title,
    images: uniqueImages,
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
  console.log(data);
  const myLikeItems = useMemo(
    () =>
      recommendations.filter(
        (rec) => !items.some((item) => item.id === rec.id),
      ),
    [items, recommendations],
  );

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
          {myLikeItems.map((rec) => {
            const href = rec.slug ? `/products/${rec.slug}` : `/products/1`;
            return (
              <SwiperSlide key={rec.id}>
                <article className="overflow-hidden rounded-xl bg-background">
                  <Link href={href} className="block">
                    <div className="relative h-32 w-full overflow-hidden">
                      <Image
                        src={rec.images[0]}
                        alt={rec.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 320px"
                        className="object-cover"
                      />
                    </div>
                  </Link>

                  <div className="flex flex-col gap-1.5 p-2.5">
                    <Link href={href}>
                      <h3 className="truncate text-xs font-semibold text-secondary sm:text-sm">
                        {rec.title}
                      </h3>
                    </Link>

                    <p
                      className="truncate text-[11px] leading-4 text-gray"
                      title={rec.description}
                    >
                      {rec.description}
                    </p>

                    <div className="mt-1 flex items-center justify-between gap-2">
                      <div>
                        <p className="text-[10px] uppercase tracking-wide text-gray">
                          Price
                        </p>
                        <p className="text-xs font-semibold text-primary">
                          {formatPrice(rec.price)}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          onAddItem({
                            id: rec.id,
                            title: rec.title,
                            price: rec.price,
                            image: rec.images[0],
                            quantity: 1,
                          })
                        }
                        className="flex h-7 items-center gap-1 rounded-xl bg-card px-2.5 text-[11px] font-medium text-white hover:bg-card/90 sm:h-8 sm:px-3 sm:text-xs"
                      >
                        <ShoppingBag className="size-3 shrink-0" />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </div>
                </article>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}


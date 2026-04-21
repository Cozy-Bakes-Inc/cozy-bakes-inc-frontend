import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { SelectionItem } from "@/interfaces";
import Link from "next/link";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

type SelectionCardProps = {
  item: SelectionItem;
  badge?: string;
};

function getProductImages(item: SelectionItem) {
  const images = [item.image, ...(item.images ?? [])].filter(
    (image): image is string => Boolean(image),
  );

  return images.length > 0
    ? Array.from(new Set(images))
    : ["/images/artisan-sourdough.jpg"];
}

function formatProductPrice(item: SelectionItem) {
  const rawPrice = item.final_price ?? item.price;

  if (typeof rawPrice === "number") return `$${rawPrice.toFixed(2)}`;
  if (typeof rawPrice === "string" && rawPrice.trim()) {
    return rawPrice.startsWith("$") ? rawPrice : `$${rawPrice}`;
  }

  return "N/A";
}

export default function SelectionCard({ item, badge: badgeOverride }: SelectionCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const images = getProductImages(item);
  const imageSrc = images[0];
  const hasMultipleImages = images.length > 1;
  const productHref = item.slug ? `/products/${item.slug}` : `/products/1`;
  const description =
    item.desc ?? item.description ?? "Freshly baked and ready to order.";
  const badge = badgeOverride ?? item.badge ?? "Featured";
  const price = formatProductPrice(item);

  return (
    <Link href={productHref} className="block h-full min-w-0">
      <article className="flex h-full w-full min-w-0 flex-col overflow-hidden rounded-2xl bg-background shadow-sm">
        <div className="relative min-w-0 overflow-hidden">
          <motion.div
            className="min-w-0"
            animate={{ scale: isHovered ? 1.04 : 1 }}
            transition={{ duration: 0.35 }}
          >
            {hasMultipleImages ? (
              <Swiper
                modules={[Autoplay]}
                slidesPerView={1}
                loop
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                className="h-60 w-full"
              >
                {images.map((image, index) => (
                  <SwiperSlide key={`${item.id}-image-${index}`}>
                    <Image
                      src={image}
                      alt={`${item.title} ${index + 1}`}
                      width={520}
                      height={360}
                      className="h-60 w-full object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <Image
                src={imageSrc}
                alt={item.title}
                width={520}
                height={360}
                className="h-60 w-full object-cover"
              />
            )}
          </motion.div>
          <span className="absolute left-3 top-3 rounded-full bg-card/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
            {badge}
          </span>
          {item.outOfStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/35">
              <span className="rounded-xl px-6 py-3 bg-chocolate/75 text-sm font-semibold text-white border border-taupe-brown">
                Out of Stock
              </span>
            </div>
          )}
        </div>
        <div className="flex min-w-0 flex-1 flex-col p-4">
          <h3 className="min-w-0 text-base font-semibold text-secondary">
            {item.title}
          </h3>
          <motion.p
            className="mt-2 min-w-0 text-xs leading-5 text-gray"
            animate={{
              height: isHovered ? "auto" : "2em",
              opacity: isHovered ? 1 : 0.7,
            }}
            transition={{ duration: 0.25 }}
            style={{ overflow: "hidden" }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
          >
            {description}
          </motion.p>
          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase text-gray">Price</p>
              <p className="text-sm font-semibold text-primary">{price}</p>
            </div>
            <Button
              variant={item.outOfStock ? "outline" : "default"}
              className={
                item.outOfStock
                  ? "h-9 gap-2 rounded-xl bg-primary/20 border-secondary/30 px-4 text-xs text-secondary"
                  : "h-9 gap-2 rounded-xl bg-card px-4 text-xs text-white hover:bg-card/90"
              }
            >
              {item.outOfStock ? (
                <>
                  <Bell className="size-3.5" />
                  {item.actionLabel ?? "Notify Me"}
                </>
              ) : (
                <>
                  <ShoppingBag className="size-3.5" />
                  {item.actionLabel ?? "Add"}
                </>
              )}
            </Button>
          </div>
        </div>
      </article>
    </Link>
  );
}

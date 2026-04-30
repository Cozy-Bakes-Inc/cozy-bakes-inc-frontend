import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { SelectionItem } from "@/interfaces";
import Link from "next/link";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

type SelectionCardProps = {
  item: SelectionItem;
};

const imageClassName = "h-44 w-full object-cover sm:h-52 lg:h-60";

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

export default function SelectionCard({ item }: SelectionCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const images = getProductImages(item);
  const imageSrc = images[0];
  const hasMultipleImages = images.length > 1;
  const productHref = item.slug ? `/products/${item.slug}` : `/products/1`;
  const description =
    item.desc ?? item.description ?? "Freshly baked and ready to order.";
  const price = formatProductPrice(item);

  return (
    <Link
      href={productHref}
      className="block h-full w-full max-w-full min-w-0 overflow-hidden"
    >
      <article
        className="group flex h-full w-full max-w-full min-w-0 flex-col overflow-hidden rounded-2xl bg-background"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative w-full max-w-full min-w-0 overflow-hidden">
          <motion.div
            className="w-full max-w-full min-w-0 origin-center overflow-hidden"
            animate={{ scale: isHovered ? 1.04 : 1 }}
            transition={{ duration: 0.35 }}
          >
            {hasMultipleImages ? (
              <Swiper
                modules={[Autoplay]}
                slidesPerView={1}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                className="h-44 w-full! max-w-full min-w-0 overflow-hidden sm:h-52 lg:h-60"
                wrapperClass="max-w-full min-w-0"
              >
                {images.map((image, index) => (
                  <SwiperSlide
                    key={`${item.id}-image-${index}`}
                    className="!w-full max-w-full min-w-0 overflow-hidden"
                  >
                    <Image
                      src={image}
                      alt={`${item.title} ${index + 1}`}
                      width={520}
                      height={360}
                      className={imageClassName}
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
                className={imageClassName}
              />
            )}
          </motion.div>
          {item.outOfStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/35">
              <span className="rounded-xl border border-taupe-brown bg-chocolate/75 px-5 py-2.5 text-sm font-semibold text-white sm:px-6 sm:py-3">
                Out of Stock
              </span>
            </div>
          )}
        </div>
        <div className="flex w-full max-w-full min-w-0 flex-1 flex-col p-3 sm:p-4">
          <h3 className="min-w-0 truncate text-sm font-semibold text-secondary sm:text-base">
            {item.title}
          </h3>
          <motion.p
            className="mt-2 min-h-10 min-w-0 overflow-hidden text-xs leading-5 text-gray"
            animate={{
              opacity: isHovered ? 1 : 0.7,
            }}
            transition={{ duration: 0.25 }}
            style={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
            }}
          >
            {description}
          </motion.p>
          <div className="mt-4 flex w-full max-w-full min-w-0 flex-wrap items-center gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-[10px] uppercase text-gray">Price</p>
              <p className="truncate text-sm font-semibold text-primary">
                {price}
              </p>
            </div>
            <Button
              variant={item.outOfStock ? "outline" : "default"}
              className={
                item.outOfStock
                  ? "h-9 w-full max-w-full min-w-0 gap-2 rounded-xl border-secondary/30 bg-primary/20 px-3 text-xs text-secondary sm:ml-auto sm:w-auto sm:px-4"
                  : "h-9 w-full max-w-full min-w-0 gap-2 rounded-xl bg-card px-3 text-xs text-white hover:bg-card/90 sm:ml-auto sm:w-auto sm:px-4"
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

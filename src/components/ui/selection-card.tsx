import { Image } from "@/components/ui/app-image";
import { Bell, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { SelectionItem } from "@/interfaces";
import Link from "next/link";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

type SelectionCardProps = {
  item: SelectionItem;
};

const imageClassName = "h-40 w-full object-cover sm:h-44 md:h-48 lg:h-56";

function getProductImages(item: SelectionItem) {
  const images = [item.image, ...(item.images ?? [])].filter(
    (image): image is string => Boolean(image),
  );
  return images.length > 0
    ? Array.from(new Set(images))
    : ["/images/artisan-sourdough.jpg"];
}

function formatPrice(raw: number | string | null | undefined): string {
  if (typeof raw === "number") return `$${raw.toFixed(2)}`;
  if (typeof raw === "string" && raw.trim())
    return raw.startsWith("$") ? raw : `$${raw}`;
  return "N/A";
}

function getPriceLines(
  item: SelectionItem,
): { label: string; price: string }[] {
  if (item.prices) {
    const lines = Object.values(item.prices)
      .flat()
      .filter((opt): opt is NonNullable<typeof opt> => opt != null)
      .map((opt) => ({
        label: opt.label,
        price: formatPrice(opt.price ?? opt.value),
      }));
    if (lines.length > 0) return lines;
  }
  const fallback = formatPrice(item.final_price ?? item.price);
  return [{ label: "", price: fallback }];
}

export default function SelectionCard({ item }: SelectionCardProps) {
  const images = getProductImages(item);
  const imageSrc = images[0];
  const hasMultipleImages = images.length > 1;
  const productHref = item.slug ? `/products/${item.slug}` : `/products/1`;
  const description =
    item.desc ?? item.description ?? "Freshly baked and ready to order.";
  const priceLines = getPriceLines(item);

  return (
    <Link
      href={productHref}
      className="block h-full w-full min-w-0 max-w-full overflow-hidden rounded-2xl"
    >
      <article className="flex h-full w-full min-w-0 flex-col overflow-hidden rounded-2xl bg-background">
        {/* Image */}
        <div className="relative w-full shrink-0 overflow-hidden">
          {hasMultipleImages ? (
            <Swiper
              modules={[Autoplay]}
              slidesPerView={1}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              style={{ width: "100%", overflow: "hidden" }}
              className="h-36 sm:h-40 md:h-48 lg:h-56"
            >
              {images.map((image, index) => (
                <SwiperSlide key={`${item.id}-image-${index}`}>
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
          {item.outOfStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/35">
              <span className="rounded-xl border border-taupe-brown bg-chocolate/75 px-4 py-2 text-xs font-semibold text-white">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Body */}
        <div className="flex min-w-0 flex-1 flex-col gap-2 overflow-hidden p-3 sm:p-4">
          <h3 className="min-w-0 truncate text-sm font-semibold capitalize text-secondary">
            {item.title}
          </h3>

          <p
            className="min-w-0 truncate text-xs leading-5 text-gray"
            title={description}
          >
            {description}
          </p>

          {/* Price + button */}
          <div className="mt-auto flex min-w-0 flex-col gap-2 pt-1">
            <div className="min-w-0 overflow-hidden">
              <p className="text-[10px] uppercase tracking-wide text-gray">
                Price
              </p>
              {priceLines.map((line, i) => (
                <p
                  key={i}
                  className="truncate text-xs font-semibold text-primary"
                  title={
                    line.label ? `${line.label} — ${line.price}` : line.price
                  }
                >
                  {line.label ? `${line.label} — ${line.price}` : line.price}
                </p>
              ))}
            </div>

            <Button
              variant={item.outOfStock ? "outline" : "default"}
              className={
                item.outOfStock
                  ? "h-8 w-full gap-1.5 rounded-xl border-secondary/30 bg-primary/20 px-2 text-xs text-secondary sm:h-9 sm:gap-2 sm:px-3"
                  : "h-8 w-full gap-1.5 rounded-xl bg-card px-2 text-xs text-white hover:bg-card/90 sm:h-9 sm:gap-2 sm:px-3"
              }
            >
              {item.outOfStock ? (
                <>
                  <Bell className="size-3 shrink-0 sm:size-3.5" />
                  <span className="truncate">
                    {item.actionLabel ?? "Notify Me"}
                  </span>
                </>
              ) : (
                <>
                  <ShoppingBag className="size-3 shrink-0 sm:size-3.5" />
                  <span className="truncate">{item.actionLabel ?? "Add"}</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </article>
    </Link>
  );
}


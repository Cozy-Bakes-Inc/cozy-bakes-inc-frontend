"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CakeSlice, Download, Sparkles, UtensilsCrossed } from "lucide-react";
import { Image } from "@/components/ui/app-image";
import { Shimmer } from "@/components/ui/shimmer";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { cn } from "@/lib";
import {
  useAllSubcategories,
  useMenu,
  useProductsBySubcategory,
} from "@/hooks/api";
import type { ApiProductItem } from "@/interfaces";

type MenuEmptyStateProps = {
  title: string;
  description: string;
  compact?: boolean;
};

function MenuEmptyState({
  title,
  description,
  compact = false,
}: MenuEmptyStateProps) {
  const EmptyIcon = compact ? CakeSlice : UtensilsCrossed;

  return (
    <div
      className={cn(
        "relative isolate overflow-hidden border border-primary/20 bg-bg-creamy text-center shadow-[0_16px_45px_rgba(135,67,6,0.06)]",
        compact
          ? "rounded-3xl px-5 py-10 sm:py-12"
          : "rounded-4xl px-6 py-14 sm:px-10 sm:py-18",
      )}
    >
      <div
        aria-hidden="true"
        className="absolute -left-16 -top-20 -z-10 size-48 rounded-full bg-primary/8 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-24 -right-16 -z-10 size-56 rounded-full bg-secondary/8 blur-3xl"
      />

      <div
        className={cn(
          "relative mx-auto grid place-items-center rounded-full border border-primary/15 bg-background text-primary shadow-[0_12px_28px_rgba(135,67,6,0.10)]",
          compact ? "size-16" : "size-20",
        )}
      >
        <span className="absolute inset-1.5 rounded-full border border-dashed border-primary/25" />
        <EmptyIcon
          aria-hidden="true"
          className={compact ? "size-7" : "size-9"}
          strokeWidth={1.7}
        />
        {!compact && (
          <span className="absolute -right-1 top-0 grid size-7 place-items-center rounded-full bg-primary text-white shadow-md">
            <Sparkles aria-hidden="true" className="size-3.5" />
          </span>
        )}
      </div>

      <h3
        className={cn(
          "font-semibold tracking-tight text-dark",
          compact ? "mt-5 text-xl" : "mt-6 text-2xl sm:text-3xl",
        )}
      >
        {title}
      </h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray sm:text-base sm:leading-7">
        {description}
      </p>
    </div>
  );
}

function formatPrice(item: ApiProductItem): string {
  const firstOption = item.prices
    ? Object.values(item.prices)
        .flat()
        .find((opt) => opt != null)
    : undefined;
  const raw =
    firstOption?.price ?? firstOption?.value ?? item.final_price ?? item.price;

  if (typeof raw === "number") return `$${raw.toFixed(2)}`;
  if (typeof raw === "string" && raw.trim())
    return raw.startsWith("$") ? raw : `$${raw}`;
  return "N/A";
}

function MenuItemsList({ slug }: { slug: string }) {
  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
  } = useProductsBySubcategory(slug);

  const products: ApiProductItem[] = useMemo(
    () => data?.pages?.flatMap((page) => page?.data?.data ?? []) ?? [],
    [data],
  );

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <Shimmer key={i} className="h-20 w-full rounded-2xl" />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <MenuEmptyState
        compact
        title="Nothing on this tray yet"
        description="We're still preparing items for this category. Try another category or check back soon."
      />
    );
  }

  return (
    <div>
      <div className="space-y-3">
        {products.map((product) => (
          <Link
            key={product.id}
            href={product.slug ? `/products/${product.slug}` : "/products/1"}
            className="flex items-center gap-4 rounded-2xl border border-primary/15 bg-background p-3 transition-colors hover:border-primary/40"
          >
            <div className="relative size-16 shrink-0 overflow-hidden rounded-xl">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="truncate text-sm font-semibold capitalize text-secondary">
                {product.title}
              </h4>
              {product.description && (
                <p className="mt-1 line-clamp-1 text-xs text-gray">
                  {product.description}
                </p>
              )}
            </div>
            <p className="shrink-0 text-sm font-semibold text-primary">
              {formatPrice(product)}
            </p>
          </Link>
        ))}
      </div>

      {hasNextPage ? (
        <div className="mt-6 flex justify-center">
          <Button
            type="button"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="rounded-full bg-bg-creamy px-6 text-xs font-semibold text-dark hover:bg-bg-creamy/90"
          >
            {isFetchingNextPage ? (
              <>
                <Loader /> Loading...
              </>
            ) : (
              "Load More Items"
            )}
          </Button>
        </div>
      ) : null}
    </div>
  );
}

export default function MenuSection() {
  const { data: menuData, isLoading: isMenuLoading } = useMenu();
  const pdfLink = menuData?.data?.pdf_file_link;

  const { data: subcategoriesData, isLoading: isSubcategoriesLoading } =
    useAllSubcategories();

  const subcategories = useMemo(
    () => subcategoriesData?.data?.data ?? [],
    [subcategoriesData],
  );

  const [activeSlug, setActiveSlug] = useState<string>("");
  const selectedSlug = subcategories.some(
    (subcategory) => subcategory.slug === activeSlug,
  )
    ? activeSlug
    : (subcategories[0]?.slug ?? "");

  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-10">
        <div className="mb-6 flex justify-end">
          {isMenuLoading ? (
            <Shimmer className="h-11 w-48 rounded-xl" />
          ) : (
            pdfLink && (
              <Button asChild className="h-11 px-5">
                <a href={pdfLink} target="_blank" rel="noreferrer" download>
                  <Download className="size-4" />
                  Menu PDF
                </a>
              </Button>
            )
          )}
        </div>

        {isSubcategoriesLoading ? (
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Shimmer key={i} className="h-10 w-28 rounded-full" />
            ))}
          </div>
        ) : subcategories.length === 0 ? (
          <MenuEmptyState
            title="Our menu is in the oven"
            description="We're putting the finishing touches on something delicious. Please check back soon to see what's freshly baked."
          />
        ) : (
          <>
            <div className="flex flex-wrap gap-2">
              {subcategories.map((subcategory) => (
                <button
                  key={subcategory.id}
                  type="button"
                  onClick={() => setActiveSlug(subcategory.slug)}
                  className={cn(
                    "rounded-full border px-5 py-2 text-sm font-semibold capitalize transition-colors",
                    selectedSlug === subcategory.slug
                      ? "border-primary bg-primary text-white"
                      : "border-primary/20 bg-bg-creamy text-dark hover:border-primary/40",
                  )}
                >
                  {subcategory.title}
                </button>
              ))}
            </div>

            {selectedSlug && (
              <div className="mt-8">
                <MenuItemsList slug={selectedSlug} />
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

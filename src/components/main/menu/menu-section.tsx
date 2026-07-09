"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Download } from "lucide-react";
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
      <p className="py-10 text-center text-sm text-taupe-brown">
        No items available in this category yet.
      </p>
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

  useEffect(() => {
    if (!activeSlug && subcategories.length > 0) {
      setActiveSlug(subcategories[0].slug);
    }
  }, [activeSlug, subcategories]);

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
          <p className="py-10 text-center text-sm text-taupe-brown">
            Our menu is being freshly prepared. Please check back soon.
          </p>
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
                    activeSlug === subcategory.slug
                      ? "border-primary bg-primary text-white"
                      : "border-primary/20 bg-bg-creamy text-dark hover:border-primary/40",
                  )}
                >
                  {subcategory.title}
                </button>
              ))}
            </div>

            {activeSlug && (
              <div className="mt-8">
                <MenuItemsList slug={activeSlug} />
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

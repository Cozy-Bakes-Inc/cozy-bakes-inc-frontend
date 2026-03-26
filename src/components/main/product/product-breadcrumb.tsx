"use client";

import { isAxiosError } from "axios";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useSingleProduct } from "@/hooks";

export default function ProductBreadcrumb() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const { data, isError, error } = useSingleProduct(slug);
  const product = data?.data;
  const isNotFound = isError && isAxiosError(error) && error.response?.status === 404;
  const productTitle = isNotFound
    ? "Product Not Available"
    : (product?.title ?? "Product");
  const subCategory = product?.sub_categories?.[0];
  const subCategoryTitle = isNotFound
    ? "Unavailable"
    : (subCategory?.title ?? "Category");
  const subCategoryHref = subCategory?.slug
    ? `/categories/${subCategory.slug}`
    : "/";

  return (
    <section className="bg-chocolate">
      <div className="mx-auto max-w-7xl px-5 py-5 text-center text-xs text-white sm:px-10 sm:text-sm">
        <nav className="inline-flex items-center justify-center gap-1 text-xs sm:text-sm">
          <Link href="/" className="text-gray-300 transition hover:text-white">
            All Categories
          </Link>
          <ChevronRight className="size-4 text-gray-400" />
          <Link
            href={subCategoryHref}
            className="text-gray-300 transition hover:text-white"
          >
            {subCategoryTitle}
          </Link>
          <ChevronRight className="size-4 text-gray-400" />
          <span className="font-medium text-primary">{productTitle}</span>
        </nav>
      </div>
    </section>
  );
}

"use client";

import { isAxiosError } from "axios";
import ProductDetails from "./product-details";
import ProductContentShimmer from "./product-content-shimmer";
import ProductTabs from "./product-tabs";
import ProductRecommendations from "./product-recommendations";
import ProductUnavailable from "./product-unavailable";
import { useSingleProduct } from "@/hooks";
import { useParams } from "next/navigation";

export default function ProductContent() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const { data, isLoading, isError, error } = useSingleProduct(slug);
  const product = data?.data;
  const isNotFound = isError && isAxiosError(error) && error.response?.status === 404;

  if (isLoading) {
    return <ProductContentShimmer />;
  }

  if (isNotFound || !product) {
    return <ProductUnavailable />;
  }

  return (
    <>
      <ProductDetails product={product} />
      <ProductTabs
        ingredients={product?.description_ingredient}
        allergens={product?.description_allergens}
      />
      <ProductRecommendations />
    </>
  );
}

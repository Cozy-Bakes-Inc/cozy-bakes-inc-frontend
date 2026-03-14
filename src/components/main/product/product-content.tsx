"use client";

import ProductDetails from "./product-details";
import ProductTabs from "./product-tabs";
import ProductRecommendations from "./product-recommendations";
import { useSingleProduct } from "@/hooks";
import { useParams } from "next/navigation";

export default function ProductContent() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const { data } = useSingleProduct(slug);
  console.log(data);
  return (
    <>
      <ProductDetails />
      <ProductTabs />
      <ProductRecommendations />
    </>
  );
}

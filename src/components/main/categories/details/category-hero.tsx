"use client";

import HeroSection from "@/components/ui/hero-section";
import { Shimmer } from "@/components/ui/shimmer";
import { useProductsBySubcategory } from "@/hooks/api/categories";
import { useParams } from "next/navigation";

function CategoryHeroShimmer() {
  return (
    <section className="relative overflow-hidden bg-black">
      <div className="absolute inset-0 bg-[url('/images/questions.png')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/65 to-black/45" />

      <div className="relative grid min-h-90 items-center gap-8 px-5 py-20 sm:px-10 lg:min-h-107.5 lg:grid-cols-2">
        <div className="max-w-2xl xl:mx-10">
          <Shimmer className="h-4 w-32 rounded-full bg-white/15" />
          <Shimmer className="mt-4 h-12 w-64 rounded-lg bg-white/15 sm:w-96" />
          <div className="mt-5 space-y-3">
            <Shimmer className="h-5 w-full max-w-xl rounded-md bg-white/15" />
            <Shimmer className="h-5 w-4/5 max-w-lg rounded-md bg-white/15" />
          </div>
        </div>

        <div className="hidden justify-self-end lg:block">
          <Shimmer className="h-88 w-87.5 rounded-3xl bg-white/15" />
        </div>
      </div>
    </section>
  );
}

export default function CategoryHeroSection() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const { data: productsData, isLoading } = useProductsBySubcategory(slug);
  const subcategory = productsData?.pages?.[0]?.sub_category;

  if (isLoading) return <CategoryHeroShimmer />;

  return (
    <HeroSection
      badge="Explore Our"
      title={subcategory?.title ?? "Bakery Treats"}
      description={
        subcategory?.description ??
        "Discover freshly baked favorites made daily with premium ingredients."
      }
      image={{
        src: "/images/logo-hero-section.png",
        alt: "Cozy Bakes Inc",
      }}
    />
  );
}

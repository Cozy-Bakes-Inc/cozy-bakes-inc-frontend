"use client";
import SelectionCard from "@/components/ui/selection-card";
import type { SelectionItem } from "@/interfaces";
import { Sparkles } from "lucide-react";

const recommendations: SelectionItem[] = [
  {
    id: "artisan-sourdough",
    title: "Artisan Sourdough",
    desc: "Traditional sourdough with a crisp crust and soft, tangy interior.",
    price: "$8.50",
    image: "/images/artisan-sourdough.jpg",
    badge: "Best Seller",
    category: "best",
  },
  {
    id: "vanilla-bean-cake",
    title: "Vanilla Bean Cake",
    desc: "Light vanilla cake with Madagascar beans and silky buttercream.",
    price: "$8.50",
    image: "/images/vanilla-bean-cake.jpg",
    badge: "Best Seller",
    category: "best",
  },
  {
    id: "chocolate-croissant",
    title: "Chocolate Croissant",
    desc: "Buttery, flaky pastry with premium chocolate and golden layers.",
    price: "$8.50",
    image: "/images/chocolate-croissant.jpg",
    badge: "Best Seller",
    category: "best",
  },
];

export default function CartRecommendations() {
  return (
    <section className="bg-bg-creamy py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-10">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-4 py-2 text-xs font-semibold text-primary">
            <Sparkles className="size-5 shrink-0" />
            <span>Recommended For You</span>
          </div>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-dark sm:text-4xl">
            Our Bakery <span className="text-heading-2">Recommendations</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-gray sm:text-base">
            Discover more freshly baked treats, made with care and the finest
            ingredients. Handpicked to perfectly complement your choice and make
            every bite even more delightful.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {recommendations.map((item) => (
            <SelectionCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import SelectionCard from "@/components/ui/selection-card";
import type { SelectionItem } from "@/interfaces";
import { AnimatePresence, motion } from "framer-motion";

const products: SelectionItem[] = [
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
    id: "chocolate-croissant",
    title: "Chocolate Croissant",
    desc: "Buttery, flaky pastry with premium chocolate and golden layers.",
    price: "$8.50",
    image: "/images/chocolate-croissant.jpg",
    badge: "Best Seller",
    category: "best",
    outOfStock: true,
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
    id: "cookies",
    title: "Cookies & Biscuits",
    desc: "Golden cookies with rich chocolate and warm crunchy texture.",
    price: "$8.50",
    image: "/images/triple-chocolate-cookies.png",
    badge: "Gluten-Free",
    category: "recommended",
  },
  {
    id: "cinnamon-rolls",
    title: "Cinnamon Rolls",
    desc: "Soft rolls with cinnamon layers and vanilla bean glaze.",
    price: "$8.50",
    image: "/images/cinnamon-rolls.jpg",
    badge: "New Product",
    category: "new",
  },
  {
    id: "french-baguette",
    title: "French Baguette",
    desc: "Classic baguette with a crisp crust and airy interior.",
    price: "$8.50",
    image: "/images/french-baguette.jpg",
    badge: "Vetri Pick",
    category: "recommended",
  },
];

export default function CategoryProductsGrid() {
  return (
    <section className="bg-bg-creamy py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-10">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {products.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 14, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.985 }}
                transition={{
                  opacity: {
                    duration: 0.25,
                    delay: index * 0.02,
                    ease: "easeOut",
                  },
                  y: { type: "spring", stiffness: 280, damping: 26 },
                  scale: { duration: 0.2, ease: "easeOut" },
                  layout: { type: "spring", stiffness: 280, damping: 30 },
                }}
              >
                <SelectionCard item={item} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

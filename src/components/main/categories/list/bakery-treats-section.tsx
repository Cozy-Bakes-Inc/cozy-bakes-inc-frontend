"use client";

import Image from "next/image";
import { useMemo } from "react";
import SelectionCard from "@/components/ui/selection-card";
import { GridShimmer } from "@/components/ui/shimmer";
import type { ApiProductItem, SelectionItem } from "@/interfaces";
import { AnimatePresence, motion } from "framer-motion";
import { useProductsPreview } from "@/hooks";

function mapProductsToSelectionItems(
  products: ApiProductItem[],
): SelectionItem[] {
  return products.map((product) => ({
    ...product,
    id: product.id,
    actionLabel: "Add",
  }));
}

export default function BakeryTreatsSection() {
  const { data, isLoading } = useProductsPreview("random", 6, true);
  const products = useMemo(
    () => mapProductsToSelectionItems(data?.data?.data ?? []),
    [data],
  );
  return (
    <section className="bg-bg-creamy py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-10">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/12 px-4 py-2 text-xs font-semibold text-primary">
            <Image src="/images/break.svg" alt="" width={18} height={18} />
            <span>Our Selection</span>
          </div>
          <h2 className="mt-4 text-3xl font-semibold text-dark sm:text-4xl">
            The Bakery Treats{" "}
            <span className="text-heading-2">Everyone Loves Daily</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-gray sm:text-base">
            Discover bestsellers baked every day with love, handmade to bring
            comfort and joy to every bite.
          </p>
        </motion.div>
        {isLoading ? (
          <GridShimmer
            cardClassName="bg-background"
          />
        ) : (
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
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
        )}
      </div>
    </section>
  );
}

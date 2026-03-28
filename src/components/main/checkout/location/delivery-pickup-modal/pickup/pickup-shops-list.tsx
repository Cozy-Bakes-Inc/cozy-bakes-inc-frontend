"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import type { ShopListItem } from "@/interfaces";
import PickupShopCard from "./pickup-shop-card";

interface PickupShopsListProps {
  shops: ShopListItem[];
  selectedShopId: number | null;
  onSelect: (shopId: number) => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  onShowMore: () => void;
}

export default function PickupShopsList({
  shops,
  selectedShopId,
  onSelect,
  hasNextPage,
  isFetchingNextPage,
  onShowMore,
}: PickupShopsListProps) {
  if (!shops.length) {
    return (
      <div className="rounded-2xl border border-dashed border-border/40 bg-background px-4 py-8 text-center">
        <p className="text-sm font-medium text-dark">No pickup locations found.</p>
        <p className="mt-1 text-xs text-gray-500">
          Try again in a bit or switch to delivery.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="grid gap-4">
        <AnimatePresence mode="popLayout" initial={false}>
          {shops.map((shop, index) => (
            <motion.div
              key={shop.id}
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
              <PickupShopCard
                shop={shop}
                isSelected={selectedShopId === shop.id}
                onSelect={onSelect}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {hasNextPage ? (
        <div className="flex justify-center">
          <Button
            type="button"
            onClick={onShowMore}
            disabled={isFetchingNextPage}
            className="rounded-full bg-bg-creamy px-6 text-xs font-semibold text-dark hover:bg-bg-creamy/90"
          >
            {isFetchingNextPage ? "Loading shops..." : "Show More Locations"}
          </Button>
        </div>
      ) : null}
    </div>
  );
}

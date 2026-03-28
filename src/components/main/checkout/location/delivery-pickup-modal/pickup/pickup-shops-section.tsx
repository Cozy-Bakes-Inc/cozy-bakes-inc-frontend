"use client";

import type { ShopListItem } from "@/interfaces";
import PickupShopsList from "./pickup-shops-list";
import PickupShopsShimmer from "./pickup-shops-shimmer";

interface PickupShopsSectionProps {
  shops: ShopListItem[];
  isLoading: boolean;
  selectedShopId: number | null;
  onSelect: (shopId: number) => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  onShowMore: () => void;
}

export default function PickupShopsSection({
  shops,
  isLoading,
  selectedShopId,
  onSelect,
  hasNextPage,
  isFetchingNextPage,
  onShowMore,
}: PickupShopsSectionProps) {
  return (
    <section className="rounded-2xl border border-border/24 bg-background p-4 sm:p-5">
      <div className="mb-4">
        <h3 className="text-base font-medium text-primary sm:text-lg">
          Pickup Locations
        </h3>
        <p className="mt-1 text-xs text-gray-500 sm:text-sm">
          Choose the branch that works best for your pickup.
        </p>
      </div>

      {isLoading ? (
        <PickupShopsShimmer />
      ) : (
        <PickupShopsList
          shops={shops}
          selectedShopId={selectedShopId}
          onSelect={onSelect}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          onShowMore={onShowMore}
        />
      )}
    </section>
  );
}

"use client";

import type { ShopListItem } from "@/interfaces";
import { cn } from "@/lib";
import { Check, Mail, MapPin, Phone } from "lucide-react";

interface PickupShopCardProps {
  shop: ShopListItem;
  isSelected: boolean;
  onSelect: (shopId: number) => void;
}

export default function PickupShopCard({
  shop,
  isSelected,
  onSelect,
}: PickupShopCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(shop.id)}
      className={cn(
        "w-full rounded-2xl border bg-background p-4 text-left transition-all sm:p-5",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
        isSelected
          ? "border-primary shadow-[0_12px_32px_rgba(185,127,55,0.14)]"
          : "border-border/24 hover:border-primary/45",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/70">
            Store Pickup
          </p>
          <h3 className="text-base font-semibold text-dark">{shop.name}</h3>
          {shop.store_description ? (
            <p className="text-sm text-gray-500">{shop.store_description}</p>
          ) : null}
        </div>

        {isSelected ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <Check className="size-3.5 shrink-0" />
            Selected
          </span>
        ) : null}
      </div>

      <div className="mt-4 space-y-3">
        <div className="flex items-start gap-2.5 text-sm text-gray-600">
          <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
          <span>{shop.address_line}</span>
        </div>

        <div className="grid gap-2 text-sm text-gray-600 sm:grid-cols-2">
          <div className="flex items-center gap-2">
            <Phone className="size-4 shrink-0 text-primary" />
            <span>{shop.phone_number}</span>
          </div>

          <div className="flex items-center gap-2">
            <Mail className="size-4 shrink-0 text-primary" />
            <span className="truncate">{shop.email}</span>
          </div>
        </div>
      </div>
    </button>
  );
}

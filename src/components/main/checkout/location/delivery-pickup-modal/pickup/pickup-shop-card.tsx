"use client";

import type { ShopListItem } from "@/interfaces";
import { cn, formatPhoneDisplay } from "@/lib";
import { Check, ExternalLink, Mail, MapPin, Phone } from "lucide-react";

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
  const handleSelect = () => onSelect(shop.id);
  const phoneHref = `tel:+${shop.phone_number.replace(/\D/g, "")}`;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleSelect}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleSelect();
        }
      }}
      className={cn(
        "cursor-pointer",
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
            Pickup Location
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
          <div className="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/10 text-primary">
            <MapPin className="size-4 shrink-0" />
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <span className="mt-1.5 min-w-0">{shop.address_line}</span>

            {shop.map_link ? (
              <a
                href={shop.map_link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(event) => event.stopPropagation()}
                className="hidden h-9 w-fit shrink-0 items-center justify-center gap-1.5 rounded-full bg-primary px-4 text-xs font-semibold text-white transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 sm:inline-flex"
                aria-label={`Get directions to ${shop.name}`}
              >
                Get Directions
                <ExternalLink className="size-3.5 shrink-0" />
              </a>
            ) : null}
          </div>
        </div>

        <div className="grid gap-2 text-sm text-gray-600 sm:grid-cols-2">
          <a
            href={phoneHref}
            onClick={(event) => event.stopPropagation()}
            className="flex items-center gap-2.5 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
            aria-label={`Call ${shop.name} at ${formatPhoneDisplay(shop.phone_number)}`}
          >
            <div className="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/10 text-primary">
              <Phone className="size-4 shrink-0" />
            </div>
            <span>{formatPhoneDisplay(shop.phone_number)}</span>
          </a>

          <a
            href={`mailto:${shop.email}`}
            onClick={(event) => event.stopPropagation()}
            className="flex min-w-0 items-center gap-2.5 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
            aria-label={`Email ${shop.name} at ${shop.email}`}
          >
            <div className="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/10 text-primary">
              <Mail className="size-4 shrink-0" />
            </div>
            <span className="truncate">{shop.email}</span>
          </a>
        </div>

        {shop.map_link ? (
          <a
            href={shop.map_link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(event) => event.stopPropagation()}
            className="inline-flex h-10 w-full items-center justify-center gap-1.5 rounded-full bg-primary px-4 text-sm font-semibold text-white transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 sm:hidden"
            aria-label={`Get directions to ${shop.name}`}
          >
            Get Directions
            <ExternalLink className="size-4 shrink-0" />
          </a>
        ) : null}
      </div>
    </div>
  );
}

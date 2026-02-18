"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";

import type { CartItem } from "@/store/cart-store";

type CartPanelItemsListProps = {
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
};

export default function CartPanelItemsList({
  items,
  onUpdateQuantity,
  onRemoveItem,
}: CartPanelItemsListProps) {
  return (
    <div className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
      {items.map((item) => (
        <div
          key={item.id}
          className="rounded-2xl border border-primary/24 bg-bg-creamy p-2.5"
        >
          <div className="flex gap-2">
            <div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-background">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="56px"
                className="object-cover"
              />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-base font-semibold leading-6 text-dark sm:text-[18px] sm:leading-7">
                {item.title}
              </p>
              <p className="mt-0.5 line-clamp-2 text-[11px] leading-4 text-gray-500 sm:text-xs">
                Light and moist vanilla cake with Madagascar vanilla beans and
                silky buttercream frosting.
              </p>
            </div>
          </div>

          <div className="mt-2 flex items-end justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.06em] text-[#6B5844] sm:text-[11px]">
                Price
              </p>
              <p className="text-base font-semibold leading-6 text-primary sm:text-[18px] sm:leading-7">
                ${item.price.toFixed(2)}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  item.quantity === 1
                    ? onRemoveItem(item.id)
                    : onUpdateQuantity(item.id, item.quantity - 1)
                }
                className={`grid size-8 place-items-center rounded-full ${
                  item.quantity === 1
                    ? "bg-[#FEF3F2] text-[#F04438]"
                    : "bg-[#F5EFE6] text-dark"
                }`}
                aria-label={`Decrease ${item.title} quantity`}
              >
                {item.quantity === 1 ? (
                  <Trash2 className="size-3.5" />
                ) : (
                  <Minus className="size-3.5" />
                )}
              </button>
              <span className="w-4 text-center text-base text-chocolate sm:text-lg">
                {item.quantity}
              </span>
              <button
                type="button"
                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                className="grid size-8 place-items-center rounded-full bg-primary text-white"
                aria-label={`Increase ${item.title} quantity`}
              >
                <Plus className="size-3.5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

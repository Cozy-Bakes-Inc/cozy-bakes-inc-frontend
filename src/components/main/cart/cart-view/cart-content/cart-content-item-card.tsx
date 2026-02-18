import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";

import type { CartItem } from "@/store/cart-store";

type CartContentItemCardProps = {
  item: CartItem;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
};

const itemDescription =
  "Light and moist vanilla cake with Madagascar vanilla beans and silky buttercream frosting.";

export default function CartContentItemCard({
  item,
  onUpdateQuantity,
  onRemoveItem,
}: CartContentItemCardProps) {
  return (
    <article className="rounded-xl border border-primary/24 bg-bg-creamy px-3 py-2.5">
      <div className="flex gap-3">
        <div className="relative size-12 shrink-0 overflow-hidden rounded-md bg-background">
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="48px"
            className="object-cover"
          />
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-dark">
            {item.title}
          </p>
          <p className="mt-0.5 line-clamp-2 text-[11px] leading-4 text-gray-500">
            {itemDescription}
          </p>
        </div>
      </div>

      <div className="mt-2.5 flex items-end justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.08em] text-[#6B5844]">
            Price
          </p>
          <p className="text-xl font-semibold leading-7 text-primary">
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
            className={`grid size-5 place-items-center rounded-full ${
              item.quantity === 1
                ? "bg-[#FEE4E2] text-[#F04438]"
                : "bg-[#EFE7DC] text-[#6B5844]"
            }`}
            aria-label={`Decrease ${item.title} quantity`}
          >
            {item.quantity === 1 ? (
              <Trash2 className="size-3" />
            ) : (
              <Minus className="size-3" />
            )}
          </button>

          <span className="w-5 text-center text-sm text-dark">
            {item.quantity}
          </span>

          <button
            type="button"
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            className="grid size-5 place-items-center rounded-full bg-primary text-white"
            aria-label={`Increase ${item.title} quantity`}
          >
            <Plus className="size-3" />
          </button>
        </div>
      </div>
    </article>
  );
}

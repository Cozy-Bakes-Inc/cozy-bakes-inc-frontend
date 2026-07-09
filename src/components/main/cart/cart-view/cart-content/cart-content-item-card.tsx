"use client";

import { Image } from "@/components/ui/app-image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { useCartStore, type CartItem, MAX_CART_ITEM_QUANTITY } from "@/store/cart-store";
import { resolveCartDisplay } from "@/lib/utils/cart-display";

type CartContentItemCardProps = {
  item: CartItem;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
};

function FlavorCounter({
  label,
  count,
  compact = false,
  atLimit = false,
  onDecrement,
  onIncrement,
}: {
  label: string;
  count: number;
  compact?: boolean;
  atLimit?: boolean;
  onDecrement: () => void;
  onIncrement: () => void;
}) {
  if (compact) {
    return (
      <div className="flex flex-col gap-1.5 rounded-xl border border-secondary/10 bg-bg-creamy p-2">
        <span className="truncate text-xs font-medium capitalize text-secondary/70">{label}</span>
        <div className="flex items-center justify-between overflow-hidden rounded-full border border-secondary/20 bg-background">
          <button
            type="button"
            onClick={onDecrement}
            aria-label={`Decrease ${label}`}
            className="flex h-7 w-7 shrink-0 items-center justify-center transition-colors hover:bg-secondary/5"
          >
            {count === 1 ? (
              <Trash2 className="size-3 text-[#F04438]" />
            ) : (
              <Minus className="size-3 text-secondary" />
            )}
          </button>
          <span className="min-w-5 text-center text-xs font-bold text-dark">{count}</span>
          <button
            type="button"
            onClick={onIncrement}
            aria-label={`Increase ${label}`}
            disabled={atLimit}
            className="flex h-7 w-7 shrink-0 items-center justify-center transition-colors hover:bg-secondary/5 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <Plus className="size-3 text-secondary" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm capitalize text-secondary/70">{label}</span>
      <div className="flex items-center overflow-hidden rounded-full border border-secondary/20 bg-background">
        <button
          type="button"
          onClick={onDecrement}
          aria-label={`Decrease ${label}`}
          className="flex h-8 w-8 items-center justify-center transition-colors hover:bg-secondary/5"
        >
          {count === 1 ? (
            <Trash2 className="size-3.5 text-[#F04438]" />
          ) : (
            <Minus className="size-3.5 text-secondary" />
          )}
        </button>
        <span className="min-w-7 text-center text-sm font-semibold text-dark">{count}</span>
        <button
          type="button"
          onClick={onIncrement}
          aria-label={`Increase ${label}`}
          disabled={atLimit}
          className="flex h-8 w-8 items-center justify-center transition-colors hover:bg-secondary/5 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <Plus className="size-3.5 text-secondary" />
        </button>
      </div>
    </div>
  );
}

export default function CartContentItemCard({
  item,
  onUpdateQuantity,
  onRemoveItem,
}: CartContentItemCardProps) {
  const router = useRouter();
  const updateItemFlavors = useCartStore((state) => state.updateItemFlavors);

  const { flavorLines, showQuantitySuffix } = resolveCartDisplay(item);
  const isPerUnitFlavor = !showQuantitySuffix && flavorLines.length > 0;
  const total = item.price * item.quantity;
  const flavorTotal = flavorLines.reduce((sum, { count }) => sum + count, 0);
  const isFlavorAtLimit = flavorTotal >= MAX_CART_ITEM_QUANTITY;
  const isQuantityAtLimit = item.quantity >= MAX_CART_ITEM_QUANTITY;

  const handleNavigate = () => {
    const slug = item.slug ?? item.id;
    if (!slug) return;
    router.push(`/products/${slug}`);
  };

  const handleFlavorChange = (label: string, delta: number) => {
    if (delta > 0 && flavorTotal >= MAX_CART_ITEM_QUANTITY) return;
    const current = item.flavors ?? {};
    const newCount = (current[label] ?? 0) + delta;
    const next = { ...current, [label]: Math.max(0, newCount) };
    Object.keys(next).forEach((k) => next[k] === 0 && delete next[k]);
    updateItemFlavors(item.id, next);
  };

  const handleDecrement = () => {
    if (item.quantity === 1) onRemoveItem(item.id);
    else onUpdateQuantity(item.id, item.quantity - 1);
  };

  const handleIncrement = () => {
    if (isQuantityAtLimit) return;
    onUpdateQuantity(item.id, item.quantity + 1);
  };

  return (
    <article className="py-5">
      {/* Image + info */}
      <div className="flex gap-4">
        <button
          type="button"
          onClick={handleNavigate}
          className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-bg-creamy"
        >
          <Image src={item.image} alt={item.title} fill sizes="96px" className="object-cover" />
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <p className="text-base font-bold capitalize text-dark">
              {item.title}
            </p>
            <p className="shrink-0 text-sm font-medium text-secondary/60">
              ${item.price.toFixed(2)}
            </p>
          </div>

          {item.priceLabel && (
            <p className="mt-0.5 text-xs font-semibold capitalize text-primary">
              {item.priceLabel}
              {showQuantitySuffix && (
                <span className="text-secondary/50"> × {item.quantity}</span>
              )}
            </p>
          )}

          {/* Per-unit flavors: individual counters */}
          {isPerUnitFlavor && (
            <>
              {flavorLines.length > 3 ? (
                /* Many flavors → compact 2-column grid */
                <div className="mt-2 grid max-h-52 grid-cols-2 gap-2 overflow-y-auto pr-0.5">
                  {flavorLines.map(({ label, count }) => (
                    <FlavorCounter
                      key={label}
                      label={label}
                      count={count}
                      compact
                      atLimit={isFlavorAtLimit}
                      onDecrement={() => handleFlavorChange(label, -1)}
                      onIncrement={() => handleFlavorChange(label, +1)}
                    />
                  ))}
                </div>
              ) : (
                /* Few flavors → single column */
                <div className="mt-1.5 divide-y divide-secondary/5">
                  {flavorLines.map(({ label, count }) => (
                    <FlavorCounter
                      key={label}
                      label={label}
                      count={count}
                      atLimit={isFlavorAtLimit}
                      onDecrement={() => handleFlavorChange(label, -1)}
                      onIncrement={() => handleFlavorChange(label, +1)}
                    />
                  ))}
                </div>
              )}
            </>
          )}

          {/* Pack flavors: read-only lines */}
          {!isPerUnitFlavor && flavorLines.length > 0 && (
            <div className="mt-1 space-y-0.5">
              {flavorLines.map(({ label, count }) => (
                <p
                  key={label}
                  className="text-sm capitalize leading-5 text-secondary/60"
                >
                  {count}x {label}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom row */}
      <div className="mt-4 flex items-center justify-between">
        {!isPerUnitFlavor ? (
          <div className="flex items-center overflow-hidden rounded-full border border-secondary/20 bg-background">
            <button
              type="button"
              onClick={handleDecrement}
              aria-label={item.quantity === 1 ? `Remove ${item.title}` : `Decrease ${item.title}`}
              className="flex h-10 w-10 items-center justify-center transition-colors hover:bg-secondary/5"
            >
              {item.quantity === 1 ? (
                <Trash2 className="size-4 text-[#F04438]" />
              ) : (
                <Minus className="size-4 text-secondary" />
              )}
            </button>
            <span className="min-w-8 text-center text-sm font-semibold text-dark">
              {item.quantity}
            </span>
            <button
              type="button"
              onClick={handleIncrement}
              aria-label={`Increase ${item.title}`}
              disabled={isQuantityAtLimit}
              className="flex h-10 w-10 items-center justify-center transition-colors hover:bg-secondary/5 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <Plus className="size-4 text-secondary" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => onRemoveItem(item.id)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FEF3F2] transition-colors hover:bg-[#fee9e7]"
            aria-label={`Remove ${item.title}`}
          >
            <Trash2 className="size-4 text-[#F04438]" />
          </button>
        )}
        <p className="text-lg font-bold text-dark">${total.toFixed(2)}</p>
      </div>
    </article>
  );
}


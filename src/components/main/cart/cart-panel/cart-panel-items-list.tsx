"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { useCartStore, type CartItem } from "@/store/cart-store";
import { resolveCartDisplay } from "@/lib/utils/cart-display";

type CartPanelItemsListProps = {
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
};

function FlavorCounter({
  label,
  count,
  compact = false,
  onDecrement,
  onIncrement,
}: {
  label: string;
  count: number;
  compact?: boolean;
  onDecrement: () => void;
  onIncrement: () => void;
}) {
  if (compact) {
    return (
      <div className="flex flex-col gap-1 rounded-xl border border-secondary/10 bg-bg-creamy p-1.5">
        <span className="truncate text-[10px] font-medium capitalize text-secondary/70">
          {label}
        </span>
        <div className="flex items-center justify-between overflow-hidden rounded-full border border-secondary/20 bg-background">
          <button
            type="button"
            onClick={onDecrement}
            aria-label={`Decrease ${label}`}
            className="flex h-6 w-6 shrink-0 items-center justify-center transition-colors hover:bg-secondary/5"
          >
            {count === 1 ? (
              <Trash2 className="size-2.5 text-[#F04438]" />
            ) : (
              <Minus className="size-2.5 text-secondary" />
            )}
          </button>
          <span className="min-w-4 text-center text-[11px] font-bold text-dark">{count}</span>
          <button
            type="button"
            onClick={onIncrement}
            aria-label={`Increase ${label}`}
            className="flex h-6 w-6 shrink-0 items-center justify-center transition-colors hover:bg-secondary/5"
          >
            <Plus className="size-2.5 text-secondary" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between py-1.5">
      <span className="text-xs capitalize text-secondary/70">{label}</span>
      <div className="flex items-center overflow-hidden rounded-full border border-secondary/20 bg-background">
        <button
          type="button"
          onClick={onDecrement}
          aria-label={`Decrease ${label}`}
          className="flex h-7 w-7 items-center justify-center transition-colors hover:bg-secondary/5"
        >
          {count === 1 ? (
            <Trash2 className="size-3 text-[#F04438]" />
          ) : (
            <Minus className="size-3 text-secondary" />
          )}
        </button>
        <span className="min-w-6 text-center text-xs font-semibold text-dark">{count}</span>
        <button
          type="button"
          onClick={onIncrement}
          aria-label={`Increase ${label}`}
          className="flex h-7 w-7 items-center justify-center transition-colors hover:bg-secondary/5"
        >
          <Plus className="size-3 text-secondary" />
        </button>
      </div>
    </div>
  );
}

function CartPanelItem({
  item,
  onUpdateQuantity,
  onRemoveItem,
}: {
  item: CartItem;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
}) {
  const router = useRouter();
  const closeCart = useCartStore((state) => state.closeCart);
  const updateItemFlavors = useCartStore((state) => state.updateItemFlavors);

  const { flavorLines, showQuantitySuffix } = resolveCartDisplay(item);
  const isPerUnitFlavor = !showQuantitySuffix && flavorLines.length > 0;
  const total = item.price * item.quantity;

  const handleNavigate = () => {
    const slug = item.slug ?? item.id;
    if (!slug) return;
    router.push(`/products/${slug}`);
    closeCart();
  };

  const handleFlavorChange = (label: string, delta: number) => {
    const current = item.flavors ?? {};
    const newCount = (current[label] ?? 0) + delta;
    const next = { ...current, [label]: Math.max(0, newCount) };
    // drop keys that hit zero
    Object.keys(next).forEach((k) => next[k] === 0 && delete next[k]);
    updateItemFlavors(item.id, next);
  };

  const handleDecrement = () => {
    if (item.quantity === 1) onRemoveItem(item.id);
    else onUpdateQuantity(item.id, item.quantity - 1);
  };

  return (
    <div className="py-4">
      {/* Image + info */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={handleNavigate}
          className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-bg-creamy"
        >
          <Image src={item.image} alt={item.title} fill sizes="80px" className="object-cover" />
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <p className="text-sm font-bold text-dark">{item.title}</p>
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
                <div className="mt-1.5 grid max-h-40 grid-cols-2 gap-1.5 overflow-y-auto pr-0.5">
                  {flavorLines.map(({ label, count }) => (
                    <FlavorCounter
                      key={label}
                      label={label}
                      count={count}
                      compact
                      onDecrement={() => handleFlavorChange(label, -1)}
                      onIncrement={() => handleFlavorChange(label, +1)}
                    />
                  ))}
                </div>
              ) : (
                /* Few flavors → single column */
                <div className="mt-1 divide-y divide-secondary/5">
                  {flavorLines.map(({ label, count }) => (
                    <FlavorCounter
                      key={label}
                      label={label}
                      count={count}
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
                <p key={label} className="text-xs leading-4 text-secondary/60">
                  {count}x {label}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom row — quantity pill for packs/no-flavor; just total for per-unit flavor */}
      <div className="mt-3 flex items-center justify-between">
        {!isPerUnitFlavor ? (
          <div className="flex items-center overflow-hidden rounded-full border border-secondary/20 bg-background">
            <button
              type="button"
              onClick={handleDecrement}
              aria-label={item.quantity === 1 ? `Remove ${item.title}` : `Decrease ${item.title}`}
              className="flex h-9 w-9 items-center justify-center transition-colors hover:bg-secondary/5"
            >
              {item.quantity === 1 ? (
                <Trash2 className="size-3.5 text-[#F04438]" />
              ) : (
                <Minus className="size-3.5 text-secondary" />
              )}
            </button>
            <span className="min-w-8 text-center text-sm font-semibold text-dark">
              {item.quantity}
            </span>
            <button
              type="button"
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              aria-label={`Increase ${item.title}`}
              className="flex h-9 w-9 items-center justify-center transition-colors hover:bg-secondary/5"
            >
              <Plus className="size-3.5 text-secondary" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => onRemoveItem(item.id)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FEF3F2] transition-colors hover:bg-[#fee9e7]"
            aria-label={`Remove ${item.title}`}
          >
            <Trash2 className="size-3.5 text-[#F04438]" />
          </button>
        )}
        <p className="text-base font-bold text-dark">${total.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default function CartPanelItemsList({
  items,
  onUpdateQuantity,
  onRemoveItem,
}: CartPanelItemsListProps) {
  return (
    <div className="flex-1 overflow-y-auto px-5">
      {items.map((item, index) => (
        <div
          key={item.id}
          className={index < items.length - 1 ? "border-b border-secondary/10" : ""}
        >
          <CartPanelItem
            item={item}
            onUpdateQuantity={onUpdateQuantity}
            onRemoveItem={onRemoveItem}
          />
        </div>
      ))}
    </div>
  );
}

import { Image } from "@/components/ui/app-image";
import { resolveCartDisplay } from "@/lib/utils/cart-display";
import { OrderLineItem } from "./types";

type OrderDetailItemProps = {
  item: OrderLineItem;
};

export default function OrderDetailItem({ item }: OrderDetailItemProps) {
  const { flavorLines, displayQuantity } = resolveCartDisplay(item);
  const total = item.price * item.quantity;

  return (
    <article className="py-4">
      {/* Image + info */}
      <div className="flex gap-3">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-bg-creamy">
          <Image src={item.image} alt={item.title} fill sizes="64px" className="object-cover" />
        </div>

        <div className="min-w-0 flex-1">
          {/* Product title + unit price */}
          <div className="flex items-start justify-between gap-3">
            <p className="text-sm font-bold capitalize text-dark">
              {item.title}
            </p>
            <p className="shrink-0 text-sm font-medium text-secondary/60">
              ${item.price.toFixed(2)}
            </p>
          </div>

          {/* Price label + total quantity */}
          {item.priceLabel && (
            <p className="mt-0.5 text-xs font-semibold capitalize text-primary">
              {item.priceLabel}
              <span className="text-secondary/50"> × {displayQuantity}</span>
            </p>
          )}

          {/* Flavor lines */}
          {flavorLines.length > 0 && (
            <div className="mt-1 space-y-0.5">
              {flavorLines.map(({ label, count }) => (
                <p
                  key={label}
                  className="text-xs capitalize leading-4 text-secondary/60"
                >
                  {count}x {label}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Qty badge + total */}
      <div className="mt-2.5 flex items-center justify-between">
        <span className="rounded-lg border border-secondary/10 bg-background px-2.5 py-1 text-xs font-medium text-secondary/60">
          Qty: {displayQuantity}
        </span>
        <p className="text-sm font-bold text-dark">${total.toFixed(2)}</p>
      </div>
    </article>
  );
}


import Image from "next/image";
import { OrderLineItem } from "./types";

type OrderDetailItemProps = {
  item: OrderLineItem;
};

export default function OrderDetailItem({ item }: OrderDetailItemProps) {
  return (
    <article className="rounded-xl border border-border/24 bg-background p-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-2.5">
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md bg-bg-creamy">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="min-w-0 flex-1 sm:max-w-65">
            <h3 className="text-sm font-semibold text-dark">{item.title}</h3>
            <p className="text-[11px] leading-4 text-gray-500 wrap-break-word">
              {item.subtitle}
            </p>
            <p className="mt-1 text-[10px] uppercase tracking-wide text-warm-brown">
              Total Price
            </p>
            <p className="text-base font-semibold text-primary">
              ${item.price.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="self-start rounded-lg border border-gray-100 bg-background px-2 py-1 text-xs text-chocolate sm:self-auto">
          {item.title} * {item.quantity}
        </div>
      </div>
    </article>
  );
}

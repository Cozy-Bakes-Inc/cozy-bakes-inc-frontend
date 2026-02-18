import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OrderLineItem } from "./types";

type CheckoutCartSummaryProps = {
  items: OrderLineItem[];
  shippingFee?: number;
  isCheckoutEnabled: boolean;
};

export default function CheckoutCartSummary({
  items,
  shippingFee = 25,
  isCheckoutEnabled,
}: CheckoutCartSummaryProps) {
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const total = subtotal + (items.length ? shippingFee : 0);

  return (
    <aside className="rounded-2xl bg-bg-creamy p-4 shadow-xs sm:p-5 lg:sticky lg:top-24">
      <div className="mb-4 flex items-center gap-2 text-primary">
        <ShoppingCart className="size-4" />
        <h2 className="text-base font-medium">My Cart</h2>
      </div>

      <div className="space-y-3 rounded-2xl bg-background p-4">
        {items.map((item) => (
          <div
            key={`checkout-${item.id}`}
            className="flex items-center justify-between text-sm"
          >
            <span className="text-gray-500">
              {item.title} * {item.quantity}
            </span>
            <span className="font-medium text-dark">
              ${(item.price * item.quantity).toFixed(0)}
            </span>
          </div>
        ))}

        <div className="flex items-center justify-between border-t border-primary/20 pt-2 text-sm">
          <span className="text-gray-500">Shipping Fee</span>
          <span className="font-medium text-primary">
            ${items.length ? shippingFee : 0}
          </span>
        </div>

        <div className="flex items-center justify-between border-t border-primary/20 pt-3">
          <span className="text-lg font-semibold text-dark">Total</span>
          <span className="text-2xl font-semibold text-primary">
            ${total.toFixed(0)}
          </span>
        </div>
      </div>

      <Button
        disabled={!isCheckoutEnabled}
        className="mt-5 h-11 w-full rounded-md bg-primary text-sm text-white hover:bg-primary/90 disabled:bg-primary/80"
      >
        Check Out
      </Button>
    </aside>
  );
}

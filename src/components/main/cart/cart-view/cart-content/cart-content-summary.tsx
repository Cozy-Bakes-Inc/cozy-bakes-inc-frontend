import { ArrowRight, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CartItem } from "@/store/cart-store";
import { useDeliveryPickupModalStore } from "@/store/delivery-pickup-modal-store";

type CartContentSummaryProps = {
  items: CartItem[];
  total: number;
};

export default function CartContentSummary({
  items,
  total,
}: CartContentSummaryProps) {
  const openModal = useDeliveryPickupModalStore((state) => state.openModal);

  return (
    <aside className="rounded-2xl bg-bg-creamy p-4 shadow-xs sm:p-5">
      <div className="flex items-center gap-2 pb-4 text-primary">
        <ShoppingCart className="size-4" />
        <h2 className="text-base font-medium">My Cart</h2>
      </div>

      <div className="rounded-2xl bg-background p-4">
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={`${item.id}-summary`}
              className="flex items-center justify-between border-b border-primary/30 pb-2"
            >
              <p className="text-sm text-gray-500">
                {item.title} * {item.quantity}
              </p>
              <p className="text-sm font-medium text-dark">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-base font-semibold text-dark">Total</p>
          <p className="text-2xl font-semibold text-primary">
            ${total.toFixed(2)}
          </p>
        </div>
      </div>

      <Button
        onClick={openModal}
        className="mt-5 h-11 w-full rounded-md bg-primary text-sm text-white hover:bg-primary/90"
      >
        Check Out
        <ArrowRight className="size-4" />
      </Button>
    </aside>
  );
}

import CheckoutSectionCard from "./checkout-section-card";
import OrderDetailItem from "./order-detail-item";
import { OrderLineItem } from "./types";

type OrderDetailsListProps = {
  items: OrderLineItem[];
};

export default function OrderDetailsList({ items }: OrderDetailsListProps) {
  return (
    <CheckoutSectionCard title="Order Details">
      <div className="space-y-2.5">
        {items.length ? (
          items.map((item) => <OrderDetailItem key={item.id} item={item} />)
        ) : (
          <div className="rounded-xl border border-dashed border-primary/40 bg-bg-creamy p-6 text-center text-sm text-gray-600">
            Your cart is empty.
          </div>
        )}
      </div>
    </CheckoutSectionCard>
  );
}

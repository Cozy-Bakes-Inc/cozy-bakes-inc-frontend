import { ArrowLeftRight, MapPin } from "lucide-react";
import CheckoutSectionCard from "./checkout-section-card";

export default function ShippingLocationCard() {
  return (
    <CheckoutSectionCard
      title="Shipping Locations"
      headerAction={
        <button
          type="button"
          className="inline-flex items-center gap-1.5 text-[11px] font-medium text-gray-500 transition hover:text-gray-700"
        >
          <ArrowLeftRight className="size-3.5 shrink-0" />
          Switch To Locker / Pickup Point
        </button>
      }
    >
      <div className="rounded-2xl border border-border/24 bg-bg-creamy p-3">
        <div className="flex items-start gap-2.5">
          <div className="mt-0.5 rounded-md bg-background p-2 text-primary">
            <MapPin className="size-4 shrink-0" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-primary">Deliver to</p>
            <p className="text-sm font-semibold text-dark">New York</p>
            <p className="mt-0.5 text-xs text-gray-500">
              1600 Pennsylvania Avenue NW - White House - Washington - DC 20500
            </p>
          </div>
        </div>
      </div>
    </CheckoutSectionCard>
  );
}

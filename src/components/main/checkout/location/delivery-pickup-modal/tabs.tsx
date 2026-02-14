import { DeliveryPickupTab } from "@/types";

interface TabsProps {
  activeTab: DeliveryPickupTab;
  onDeliveryClick: () => void;
  onPickupClick: () => void;
}

export default function DeliveryPickupTabs({
  activeTab,
  onDeliveryClick,
  onPickupClick,
}: TabsProps) {
  return (
    <div className="rounded-full border border-delivery-modal-border bg-delivery-modal-muted-bg p-1">
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={onDeliveryClick}
          className={`h-11 rounded-full px-4 text-sm font-medium transition-colors md:text-base ${
            activeTab === "delivery"
              ? "bg-delivery-modal-border text-white"
              : "text-delivery-modal-tab-inactive"
          }`}
        >
          Delivery Address
        </button>
        <button
          type="button"
          onClick={onPickupClick}
          className={`h-11 rounded-full px-4 text-sm font-medium transition-colors md:text-base ${
            activeTab === "pickup"
              ? "bg-delivery-modal-border text-white"
              : "text-delivery-modal-tab-inactive"
          }`}
        >
          Store Pickup
        </button>
      </div>
    </div>
  );
}

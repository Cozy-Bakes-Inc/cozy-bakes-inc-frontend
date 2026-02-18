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
    <div className="rounded-full border border-primary bg-bg-creamy p-1">
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={onDeliveryClick}
          className={`h-11 rounded-full px-4 text-sm font-medium transition-colors md:text-base ${
            activeTab === "delivery" ? "bg-primary text-white" : "text-gray-600"
          }`}
        >
          Delivery Address
        </button>
        <button
          type="button"
          onClick={onPickupClick}
          className={`h-11 rounded-full px-4 text-sm font-medium transition-colors md:text-base ${
            activeTab === "pickup" ? "bg-primary text-white" : "text-gray-600"
          }`}
        >
          Store Pickup
        </button>
      </div>
    </div>
  );
}

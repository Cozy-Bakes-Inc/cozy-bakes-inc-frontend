import { ArrowLeft, MapPin } from "lucide-react";

interface HeaderProps {
  isDeliveryDetails: boolean;
  onBackToMap: () => void;
}

export default function DeliveryPickupModalHeader({
  isDeliveryDetails,
  onBackToMap,
}: HeaderProps) {
  if (isDeliveryDetails) {
    return (
      <button
        type="button"
        onClick={onBackToMap}
        className="flex items-center gap-2 pr-8"
      >
        <span className="grid size-10 place-items-center rounded-lg bg-bg-creamy">
          <ArrowLeft className="size-5 text-primary shrink-0" />
        </span>
        <span>Deliver to</span>
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2 pr-8">
      <MapPin className="size-5 text-primary shrink-0" />
      <span>Delivery & Pickup Locations</span>
    </div>
  );
}

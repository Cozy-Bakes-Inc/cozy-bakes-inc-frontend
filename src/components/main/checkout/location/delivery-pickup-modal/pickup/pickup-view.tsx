import { Button } from "@/components/ui/button";
import { CalendarDays, MapPin } from "lucide-react";

interface PickupViewProps {
  onConfirm?: () => void;
}

export default function PickupView({ onConfirm }: PickupViewProps) {
  return (
    <>
      <div className="rounded-2xl border border-delivery-modal-map-border bg-delivery-modal-surface p-2.5">
        <div className="mb-3 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <p className="text-sm font-semibold text-delivery-modal-text">
            Available At
          </p>
          <div className="flex items-center gap-2 text-sm font-semibold text-delivery-modal-muted-text">
            <CalendarDays className="size-4 text-delivery-modal-border shrink-0" />
            <span>Thursday - Jan 18 - 9:00 AM - 2:00 PM</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="grid size-10 sm:size-16.75 place-items-center rounded-lg bg-delivery-modal-map-surface shrink-0">
            <MapPin className="size-5 text-delivery-modal-border shrink-0" />
          </div>
          <div className="space-y-1">
            <p className="text-xs font-semibold text-delivery-modal-border">
              Store Pickup
            </p>
            <p className="text-sm font-semibold text-delivery-modal-text md:text-base">
              New York
            </p>
            <p className="text-xs font-medium text-delivery-modal-muted-text">
              1600 Pennsylvania Avenue NW - White House - Washington - DC 20500
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          onClick={onConfirm}
          className="h-13.5 min-w-34 rounded-lg bg-delivery-modal-border px-6 text-sm font-medium text-white hover:bg-delivery-modal-border/90 md:text-base"
        >
          Confirm
        </Button>
      </div>
    </>
  );
}

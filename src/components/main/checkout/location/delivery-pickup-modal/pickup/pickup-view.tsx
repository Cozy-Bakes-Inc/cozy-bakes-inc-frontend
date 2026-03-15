import ReceiverDetailsFields from "@/components/main/checkout/receiver-details-fields";
import { Button } from "@/components/ui/button";
import { CalendarDays, MapPin } from "lucide-react";

interface PickupViewProps {
  onConfirm?: () => void;
}

export default function PickupView({ onConfirm }: PickupViewProps) {
  return (
    <>
      <div className="space-y-4">
        <div className="rounded-2xl border border-border/24 bg-background p-2.5">
          <div className="mb-3 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <p className="text-sm font-semibold text-dark">Available At</p>
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-500">
              <CalendarDays className="size-4 shrink-0 text-primary" />
              <span>Thursday - Jan 18 - 9:00 AM - 2:00 PM</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-bg-creamy sm:size-16.75">
              <MapPin className="size-5 shrink-0 text-primary" />
            </div>
            <div className="space-y-1">
              <p className="text-xs font-semibold text-primary">Store Pickup</p>
              <p className="text-sm font-semibold text-dark md:text-base">
                New York
              </p>
              <p className="text-xs font-medium text-gray-500">
                1600 Pennsylvania Avenue NW - White House - Washington - DC
                20500
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border/24 bg-background p-4 sm:p-5">
          <div className="mb-4">
            <h3 className="text-base font-medium text-primary sm:text-lg">
              Receiver Details
            </h3>
            <p className="mt-1 text-xs text-gray-500 sm:text-sm">
              Add the pickup receiver information so the order is ready for hand
              off at the store.
            </p>
          </div>
          <ReceiverDetailsFields />
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          onClick={onConfirm}
          className="h-13.5 min-w-34 rounded-lg bg-primary px-6 text-sm font-medium text-white hover:bg-primary/90 md:text-base"
        >
          Confirm
        </Button>
      </div>
    </>
  );
}

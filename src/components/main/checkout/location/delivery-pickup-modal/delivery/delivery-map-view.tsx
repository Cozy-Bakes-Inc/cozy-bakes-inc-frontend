import { Button } from "@/components/ui/button";
import { MAP_IMAGE } from "@/constants";
import { LocateFixed, MapPin, Search } from "lucide-react";
import Image from "next/image";

interface DeliveryMapViewProps {
  onConfirmLocation: () => void;
}

export default function DeliveryMapView({
  onConfirmLocation,
}: DeliveryMapViewProps) {
  return (
    <>
      <div className="flex flex-col gap-3 md:flex-row">
        <div className="flex h-13.5 min-h-13.5 w-full flex-1 items-center gap-3 rounded-lg border border-gray bg-background px-3">
          <Search className="size-5 text-gray" />
          <input
            type="text"
            aria-label="Search for a location"
            placeholder="Search for a location"
            className="h-full w-full bg-transparent text-sm text-dark outline-none placeholder:text-gray md:text-base"
          />
        </div>
        <Button className="h-13.5 min-h-13.5 rounded-lg bg-primary px-5 text-sm font-medium text-white hover:bg-primary/90 md:text-base">
          <LocateFixed className="size-5" />
          Use Current Location
        </Button>
      </div>

      <div className="overflow-hidden rounded-3xl border border-border/24 bg-bg-creamy">
        <div className="relative h-80 sm:h-105">
          <Image
            src={MAP_IMAGE}
            fill
            alt="Map preview for delivery location"
            className="h-full w-full object-cover"
          />

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="rounded-full border border-primary bg-background/95 px-4 py-2 text-xs font-medium text-dark shadow-sm md:text-sm">
              Your Order Will Deliver Here
            </div>
            <div className="mx-auto mt-2 h-0 w-0 border-x-8 border-t-10 border-x-transparent border-t-primary" />
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-border/24 bg-background p-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="grid size-13 place-items-center rounded-lg bg-bg-creamy">
              <MapPin className="size-5 text-primary" />
            </div>
            <div className="space-y-1">
              <p className="text-xs font-semibold text-primary">
                Current Location
              </p>
              <p className="text-sm font-semibold text-dark md:text-base">
                New York
              </p>
              <p className="text-xs font-medium text-gray-500">
                1600 Pennsylvania Avenue NW - White House - Washington - DC
                20500
              </p>
            </div>
          </div>

          <Button
            onClick={onConfirmLocation}
            className="h-11.5 rounded-lg bg-primary px-6 text-sm font-medium text-white hover:bg-primary/90 md:text-base"
          >
            Confirm Location
          </Button>
        </div>
      </div>
    </>
  );
}

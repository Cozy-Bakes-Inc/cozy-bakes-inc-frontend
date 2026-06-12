"use client";

import { Button } from "@/components/ui/button";
import { useDeliveryPickupModalStore } from "@/store/delivery-pickup-modal-store";
import { MapPin } from "lucide-react";
import { LocationPicker } from "./location-picker";

interface DeliveryMapViewProps {
  onConfirmLocation: () => void;
}

export default function DeliveryMapView({ onConfirmLocation }: DeliveryMapViewProps) {
  const deliveryLocation = useDeliveryPickupModalStore((state) => state.deliveryLocation);
  const setDeliveryLocation = useDeliveryPickupModalStore((state) => state.setDeliveryLocation);

  return (
    <>
      <LocationPicker
        lat={deliveryLocation.latitude}
        lng={deliveryLocation.longitude}
        fallbackAddress={deliveryLocation.fullAddress}
        onChange={(lat, lng, fullAddress, label) => {
          setDeliveryLocation({
            ...deliveryLocation,
            latitude: lat,
            longitude: lng,
            fullAddress: fullAddress || deliveryLocation.fullAddress,
            label,
          });
        }}
      />

      <div className="flex flex-col gap-4 rounded-3xl border border-border/24 bg-background p-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="grid size-13 place-items-center rounded-lg bg-bg-creamy">
            <MapPin className="size-5 text-primary" />
          </div>
          <div className="space-y-1">
            <p className="text-xs font-semibold text-primary">Current Location</p>
            <p className="text-sm font-semibold text-dark md:text-base">
              {deliveryLocation.label || "No location selected"}
            </p>
            <p className="text-xs font-medium text-gray-500">{deliveryLocation.fullAddress}</p>
          </div>
        </div>

        <Button
          onClick={onConfirmLocation}
          disabled={!deliveryLocation.latitude && !deliveryLocation.longitude}
          className="h-11.5 rounded-lg bg-primary px-6 text-sm font-medium text-white hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50 md:text-base"
        >
          Confirm Location
        </Button>
      </div>
    </>
  );
}

"use client";

import { useAuthenticatedUser } from "@/hooks";
import { useDeliveryPickupModalStore } from "@/store/delivery-pickup-modal-store";
import { getFulfillmentTypeFromSearchParams } from "@/lib/utils/checkout";
import { ArrowLeftRight, MapPin, PackageCheck } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { Shimmer } from "@/components/ui/shimmer";
import CheckoutSectionCard from "./checkout-section-card";

export default function ShippingLocationCard() {
  const { data: authenticatedUser, isLoading } = useAuthenticatedUser(true);
  const searchParams = useSearchParams();
  const openModal = useDeliveryPickupModalStore((state) => state.openModal);
  const deliveryLocation = useDeliveryPickupModalStore(
    (state) => state.deliveryLocation,
  );
  const setDeliveryLocation = useDeliveryPickupModalStore(
    (state) => state.setDeliveryLocation,
  );
  const pickupLocation = useDeliveryPickupModalStore(
    (state) => state.pickupLocation,
  );
  const fulfillmentType = getFulfillmentTypeFromSearchParams(searchParams);
  const isPickup = fulfillmentType === "pickup";

  const hasHydratedLocation = useRef(false);
  const shipping = authenticatedUser?.data?.user?.shipping;

  useEffect(() => {
    if (hasHydratedLocation.current) return;
    if (!shipping?.address_line) return;

    setDeliveryLocation({
      ...deliveryLocation,
      label: shipping.building_cluster?.trim() || deliveryLocation.label,
      fullAddress: shipping.address_line.trim(),
      latitude: Number(shipping.latitude) || deliveryLocation.latitude,
      longitude: Number(shipping.longitude) || deliveryLocation.longitude,
      aptVilla: shipping.apt_villa?.trim() || "",
      buildingCluster: shipping.building_cluster?.trim() || "",
      streetLandmark: shipping.street_landmark?.trim() || "",
    });
    hasHydratedLocation.current = true;
  }, [deliveryLocation, setDeliveryLocation, shipping]);

  const deliveryLabel = shipping?.building_cluster?.trim() || "";
  const deliveryAddress = shipping?.address_line?.trim() || "";

  return (
    <CheckoutSectionCard
      title="Shipping Locations"
      headerAction={
        isLoading ? (
          <Shimmer className="h-4 w-40 rounded-md" />
        ) : (
          <button
            type="button"
            onClick={openModal}
            className="inline-flex items-center gap-1.5 text-[11px] font-medium text-gray-500 transition hover:text-gray-700"
          >
            <ArrowLeftRight className="size-3.5 shrink-0" />
            {isPickup
              ? "Switch To Delivery Address"
              : "Switch To Pickup Location"}
          </button>
        )
      }
    >
      {isLoading ? (
        <Shimmer className="h-16 w-full rounded-2xl" />
      ) : (
        <div className="rounded-2xl border border-border/24 bg-bg-creamy p-3">
          <div className="flex items-start gap-2.5">
            <div className="mt-0.5 rounded-md bg-background p-2 text-primary">
              {isPickup ? (
                <PackageCheck className="size-4 shrink-0" />
              ) : (
                <MapPin className="size-4 shrink-0" />
              )}
            </div>
            <div>
              <p className="text-[11px] font-semibold text-primary">
                {isPickup ? "Pickup from" : "Deliver to"}
              </p>
              <p className="text-sm font-semibold text-dark">
                {isPickup
                  ? pickupLocation.name || "Cozy Bakes Pickup Point"
                  : deliveryLabel}
              </p>
              <p className="mt-0.5 text-xs text-gray-500">
                {isPickup
                  ? pickupLocation.fullAddress ||
                    "Choose your pickup location from the list."
                  : deliveryAddress}
              </p>
            </div>
          </div>
        </div>
      )}
    </CheckoutSectionCard>
  );
}

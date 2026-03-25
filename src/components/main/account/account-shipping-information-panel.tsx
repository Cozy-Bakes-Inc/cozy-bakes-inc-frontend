"use client";

import { ArrowUpDown, MapPin } from "lucide-react";
import type { ReactNode } from "react";
import type { AccountShippingInformationData } from "@/interfaces/main/account";
import { Button } from "@/components/ui/button";
import { Shimmer } from "@/components/ui/shimmer";
import { useAuthenticatedUser } from "@/hooks";
import { useDeliveryPickupModalStore } from "@/store/delivery-pickup-modal-store";
import { useEffect, useRef } from "react";

type AccountShippingInformationPanelProps = {
  data: AccountShippingInformationData;
};

type ReadOnlyFieldProps = {
  label: string;
  value: string;
  trailing?: ReactNode;
};

function ReadOnlyField({ label, value, trailing }: ReadOnlyFieldProps) {
  return (
    <div className="space-y-2">
      <p className="text-base font-medium text-dark">{label}</p>
      <div className="flex min-h-14 items-center justify-between gap-2 rounded-lg border border-primary/90 bg-background px-3">
        <p className="text-sm font-medium text-dark">{value}</p>
        {trailing}
      </div>
    </div>
  );
}

export default function AccountShippingInformationPanel({
  data,
}: AccountShippingInformationPanelProps) {
  const { data: authenticatedUser, isLoading } = useAuthenticatedUser(true);
  const openModal = useDeliveryPickupModalStore((state) => state.openModal);
  const deliveryLocation = useDeliveryPickupModalStore(
    (state) => state.deliveryLocation,
  );
  const setDeliveryLocation = useDeliveryPickupModalStore(
    (state) => state.setDeliveryLocation,
  );
  const user = authenticatedUser?.data?.user;
  const receiver = user?.receiver;
  const shipping = user?.shipping;
  const receiverFirstName = receiver?.first_name?.trim() ?? "";
  const receiverLastName = receiver?.last_name?.trim() ?? "";
  const receiverPhone = receiver?.phone_number?.trim() ?? "";
  const shippingTitle = shipping?.building_cluster?.trim() ?? "";
  const shippingAddress = shipping?.address_line?.trim() ?? "";
  const hasShippingInfo = Boolean(shippingTitle || shippingAddress);
  const hasReceiverInfo = Boolean(
    receiverFirstName || receiverLastName || receiverPhone,
  );
  const hasHydratedLocation = useRef(false);

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

  return (
    <section className="mt-4 rounded-3xl bg-bg-creamy p-3 sm:p-6">
      <div className="rounded-3xl border border-border/24 p-4 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-xl font-medium text-primary">
            {data.sectionTitle}
          </h3>
          <Button
            type="button"
            variant="ghost"
            size="default"
            onClick={openModal}
            className="inline-flex h-auto shrink-0 items-center gap-2 px-0 py-0 text-xs font-medium text-gray hover:bg-transparent hover:text-dark sm:text-sm"
          >
            <ArrowUpDown className="size-4 shrink-0 text-current" />
            {hasShippingInfo ? data.address.changeAddressLabel : "Add Address"}
          </Button>
        </div>

        <article className="mt-3 rounded-2xl border border-border/24 bg-background p-4 sm:p-5">
          {isLoading ? (
            <div className="flex items-start gap-3">
              <Shimmer className="size-8 shrink-0 rounded-full" />
              <div className="min-w-0 flex-1 space-y-2">
                <Shimmer className="h-4 w-20 rounded-md" />
                <Shimmer className="h-8 w-64 rounded-md sm:w-80" />
                <Shimmer className="h-5 w-full max-w-2xl rounded-md" />
              </div>
            </div>
          ) : !hasShippingInfo ? (
            <div>
              <div>
                <p className="text-sm font-semibold text-dark">
                  No shipping information added yet
                </p>
                <p className="mt-1 text-sm font-medium text-gray">
                  Add your delivery address to save your shipping information.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-3">
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-bg-creamy text-primary">
                <MapPin className="size-5 shrink-0" />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-primary">
                  {data.address.deliverToLabel}
                </p>
                <p className="text-[28px] font-semibold leading-8 text-dark sm:text-[30px]">
                  {shippingTitle}
                </p>
                <p className="mt-1 text-sm font-medium text-gray">
                  {shippingAddress}
                </p>
              </div>
            </div>
          )}
        </article>

        <div className="mt-4">
          <h3 className="text-xl font-medium text-primary">
            {data.receiver.title}
          </h3>

          <div className="mt-3 rounded-2xl bg-background p-3 sm:p-4">
            {isLoading ? (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  {Array.from({ length: 2 }).map((_, index) => (
                    <div key={index} className="space-y-2">
                      <Shimmer className="h-6 w-28 rounded-md" />
                      <Shimmer className="h-14 w-full rounded-lg" />
                    </div>
                  ))}
                </div>

                <div className="mt-4 space-y-2">
                  <Shimmer className="h-6 w-28 rounded-md" />
                  <Shimmer className="h-14 w-full rounded-lg" />
                </div>
              </>
            ) : !hasReceiverInfo ? (
              <div>
                <div>
                  <p className="text-sm font-semibold text-dark">
                    No receiver details added yet
                  </p>
                  <p className="mt-1 text-sm font-medium text-gray">
                    Add receiver details so your orders can be delivered correctly.
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  <ReadOnlyField
                    label={data.receiver.firstNameLabel}
                    value={receiverFirstName}
                  />
                  <ReadOnlyField
                    label={data.receiver.lastNameLabel}
                    value={receiverLastName}
                  />
                </div>

                <div className="mt-4">
                  <ReadOnlyField
                    label={data.receiver.phoneLabel}
                    value={receiverPhone}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

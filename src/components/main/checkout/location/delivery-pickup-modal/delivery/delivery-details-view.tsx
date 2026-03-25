import { useEffect, useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { LOCATION_IMAGE } from "@/constants";
import { useAuthenticatedUser } from "@/hooks";
import {
  shippingInformationSchema,
  type ShippingInformationSchemaValues,
} from "@/schemas/main/account";
import { updateShippingInformationAPI } from "@/services/mutations/account";
import { useDeliveryPickupModalStore } from "@/store/delivery-pickup-modal-store";
import DeliveryAddressDetailsSection from "./delivery-address-details-section";
import DeliveryReceiverDetailsSection from "./delivery-receiver-details-section";
import {
  buildInitialShippingInformationValues,
  buildCurrentShippingInformationValues,
  hasShippingInformationChanged,
  normalizeShippingInformationValues,
} from "./delivery-details-form-helpers";

interface DeliveryDetailsViewProps {
  onBackToMap: () => void;
  onSaveLocation?: () => void;
}

export default function DeliveryDetailsView({
  onBackToMap,
  onSaveLocation,
}: DeliveryDetailsViewProps) {
  const queryClient = useQueryClient();
  const { data: authenticatedUser } = useAuthenticatedUser(true);
  const deliveryLocation = useDeliveryPickupModalStore(
    (state) => state.deliveryLocation,
  );
  const setDeliveryLocation = useDeliveryPickupModalStore(
    (state) => state.setDeliveryLocation,
  );
  const setReceiverDetails = useDeliveryPickupModalStore(
    (state) => state.setReceiverDetails,
  );
  const receiverDetails = useDeliveryPickupModalStore(
    (state) => state.receiverDetails,
  );
  const user = authenticatedUser?.data?.user;
  const savedValues = useMemo(
    () => buildInitialShippingInformationValues(user),
    [user],
  );

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<ShippingInformationSchemaValues>({
    defaultValues: {
      first_name: "",
      last_name: "",
      phone_number: "",
      apt_villa: "",
      building_cluster: "",
      street_landmark: "",
      latitude: "",
      longitude: "",
    },
  });

  useEffect(() => {
    const nextValues = normalizeShippingInformationValues(
      buildCurrentShippingInformationValues({
        user,
        deliveryLocation,
        receiverDetails,
      }),
    );

    reset(nextValues);
  }, [deliveryLocation, receiverDetails, reset, user]);

  const watchedValues = useWatch({ control });
  const currentValues = normalizeShippingInformationValues({
    ...savedValues,
    ...watchedValues,
  });
  const hasChanges = hasShippingInformationChanged({
    currentValues,
    initialValues: savedValues,
  });

  const onSubmit = async (values: ShippingInformationSchemaValues) => {
    const payload = normalizeShippingInformationValues(values);
    const schemaResult = shippingInformationSchema.safeParse(payload);

    if (!schemaResult.success) {
      return;
    }

    if (!hasChanges) {
      return;
    }

    const result = await updateShippingInformationAPI(payload);

    if (!result?.ok) {
      toast.error(result?.message || "Failed to update shipping information");
      return;
    }

    setDeliveryLocation({
      ...deliveryLocation,
      aptVilla: payload.apt_villa,
      buildingCluster: payload.building_cluster,
      streetLandmark: payload.street_landmark ?? "",
      latitude: Number(payload.latitude),
      longitude: Number(payload.longitude),
    });
    setReceiverDetails({
      firstName: payload.first_name,
      lastName: payload.last_name,
      phoneNumber: payload.phone_number,
    });

    reset(payload);
    toast.success(result?.message || "Shipping information updated successfully");
    await queryClient.invalidateQueries({
      queryKey: ["authenticatedUser"],
    });
    onSaveLocation?.();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="flex flex-col gap-3 rounded-2xl border border-border/24 p-2.5 md:flex-row md:items-center md:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          <div className="grid size-16.75 shrink-0 place-items-center rounded-lg bg-bg-creamy">
            <Image
              src={LOCATION_IMAGE}
              alt="Selected location"
              width={50}
              height={50}
            />
          </div>
          <div className="min-w-0 space-y-1">
            <p className="text-xs font-semibold text-primary">Deliver to</p>
            <p className="text-sm font-semibold text-dark md:text-base">
              {deliveryLocation.label}
            </p>
            <p className="wrap-break-word text-xs font-medium text-gray-500">
              {deliveryLocation.fullAddress}
            </p>
          </div>
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={onBackToMap}
          className="h-13.5 w-full border-primary px-4 text-sm font-medium text-primary hover:bg-primary/10 hover:text-primary md:w-auto md:px-6 md:text-base"
        >
          Change Location
        </Button>
      </div>

      <input type="hidden" {...register("latitude")} />
      <input type="hidden" {...register("longitude")} />

      <DeliveryAddressDetailsSection errors={errors} register={register} />
      <DeliveryReceiverDetailsSection errors={errors} register={register} />

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={(!isDirty && !hasChanges) || !hasChanges || isSubmitting}
          className="h-13.5 w-full rounded-lg bg-primary px-6 text-sm font-medium text-white hover:bg-primary/50 md:w-auto md:min-w-50.5 md:text-base"
        >
          {isSubmitting ? <Loader /> : "Save Location"}
        </Button>
      </div>
    </form>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { useAuthenticatedUser, useShops } from "@/hooks";
import {
  receiverDetailsSchema,
  type ReceiverDetailsSchemaValues,
} from "@/schemas/main/account";
import { updateReceiverDetailsAPI } from "@/services/mutations/account";
import { useDeliveryPickupModalStore } from "@/store/delivery-pickup-modal-store";
import { ShopListItem } from "@/interfaces";
import PickupReceiverDetailsSection from "./pickup-receiver-details-section";
import PickupShopsSection from "./pickup-shops-section";

interface PickupViewProps {
  onConfirm?: () => void;
}

export default function PickupView({ onConfirm }: PickupViewProps) {
  const queryClient = useQueryClient();
  const [selectedShopIdOverride, setSelectedShopIdOverride] = useState<
    number | null
  >(null);
  const {
    data: shopsData,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useShops();
  const shops: ShopListItem[] = useMemo(
    () => shopsData?.pages?.flatMap((page) => page?.data?.data ?? []) ?? [],
    [shopsData],
  );
  const { data: authenticatedUser } = useAuthenticatedUser(true);
  const receiverDetails = useDeliveryPickupModalStore(
    (state) => state.receiverDetails,
  );
  const pickupLocation = useDeliveryPickupModalStore(
    (state) => state.pickupLocation,
  );
  const setReceiverDetails = useDeliveryPickupModalStore(
    (state) => state.setReceiverDetails,
  );
  const setPickupLocation = useDeliveryPickupModalStore(
    (state) => state.setPickupLocation,
  );
  const user = authenticatedUser?.data?.user;
  const initialValues = useMemo<ReceiverDetailsSchemaValues>(
    () => ({
      first_name:
        user?.receiver?.first_name?.trim() || receiverDetails.firstName,
      last_name: user?.receiver?.last_name?.trim() || receiverDetails.lastName,
      phone_number:
        user?.receiver?.phone_number?.trim() || receiverDetails.phoneNumber,
    }),
    [
      receiverDetails.firstName,
      receiverDetails.lastName,
      receiverDetails.phoneNumber,
      user,
    ],
  );

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ReceiverDetailsSchemaValues>({
    defaultValues: {
      first_name: "",
      last_name: "",
      phone_number: "",
    },
  });

  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  const selectedShopId = useMemo(() => {
    if (
      selectedShopIdOverride &&
      shops.some((shop) => shop.id === selectedShopIdOverride)
    ) {
      return selectedShopIdOverride;
    }

    if (
      pickupLocation.id &&
      shops.some((shop) => shop.id === pickupLocation.id)
    ) {
      return pickupLocation.id;
    }

    return shops[0]?.id ?? null;
  }, [pickupLocation.id, selectedShopIdOverride, shops]);
  const initialSelectedShopId = useMemo(() => {
    if (pickupLocation.id && shops.some((shop) => shop.id === pickupLocation.id)) {
      return pickupLocation.id;
    }

    return shops[0]?.id ?? null;
  }, [pickupLocation.id, shops]);

  const selectedShop = shops.find((shop) => shop.id === selectedShopId) ?? null;

  const watchedValues = useWatch({ control });
  const normalizedValues = {
    first_name: watchedValues.first_name?.trim() ?? "",
    last_name: watchedValues.last_name?.trim() ?? "",
    phone_number: watchedValues.phone_number?.trim() ?? "",
  };
  const hasChanges =
    normalizedValues.first_name !== initialValues.first_name ||
    normalizedValues.last_name !== initialValues.last_name ||
    normalizedValues.phone_number !== initialValues.phone_number;
  const hasSelectedShopChanged = selectedShopId !== initialSelectedShopId;
  const canSubmit = hasChanges || hasSelectedShopChanged;

  const onSubmit = async (values: ReceiverDetailsSchemaValues) => {
    const payload = {
      first_name: values.first_name.trim(),
      last_name: values.last_name.trim(),
      phone_number: values.phone_number.trim(),
    };

    const schemaResult = receiverDetailsSchema.safeParse(payload);
    if (!schemaResult.success) {
      return;
    }

    if (!selectedShop) {
      toast.error("Please select a pickup location");
      return;
    }

    if (hasChanges) {
      const result = await updateReceiverDetailsAPI(payload);

      if (!result?.ok) {
        toast.error(result?.message || "Failed to update receiver details");
        return;
      }

      await queryClient.invalidateQueries({
        queryKey: ["authenticatedUser"],
      });

      toast.success(result?.message || "Receiver details updated successfully");
    }

    setReceiverDetails({
      firstName: payload.first_name,
      lastName: payload.last_name,
      phoneNumber: payload.phone_number,
    });
    setPickupLocation({
      id: selectedShop.id,
      name: selectedShop.name,
      fullAddress: selectedShop.address_line,
      phoneNumber: selectedShop.phone_number,
      email: selectedShop.email,
      storeDescription: selectedShop.store_description ?? "",
    });
    reset(payload);
    onConfirm?.();
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <PickupShopsSection
          shops={shops}
          isLoading={isLoading}
          selectedShopId={selectedShopId}
          onSelect={setSelectedShopIdOverride}
          hasNextPage={Boolean(hasNextPage)}
          isFetchingNextPage={isFetchingNextPage}
          onShowMore={() => fetchNextPage()}
        />

        <PickupReceiverDetailsSection register={register} errors={errors} />
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={!canSubmit || isSubmitting}
          className="h-13.5 min-w-34 rounded-lg bg-primary px-6 text-sm font-medium text-white hover:bg-primary/90 md:text-base"
        >
          {isSubmitting ? <Loader /> : "Confirm"}
        </Button>
      </div>
    </form>
  );
}

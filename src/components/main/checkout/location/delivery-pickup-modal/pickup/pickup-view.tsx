"use client";

import { useEffect, useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { CalendarDays, MapPin } from "lucide-react";
import { useAuthenticatedUser } from "@/hooks";
import {
  receiverDetailsSchema,
  type ReceiverDetailsSchemaValues,
} from "@/schemas/main/account";
import { updateReceiverDetailsAPI } from "@/services/mutations/account";
import { useDeliveryPickupModalStore } from "@/store/delivery-pickup-modal-store";
import DeliveryDetailsFormInput from "../delivery/delivery-details-form-input";

interface PickupViewProps {
  onConfirm?: () => void;
}

export default function PickupView({ onConfirm }: PickupViewProps) {
  const queryClient = useQueryClient();
  const { data: authenticatedUser } = useAuthenticatedUser(true);
  const receiverDetails = useDeliveryPickupModalStore(
    (state) => state.receiverDetails,
  );
  const setReceiverDetails = useDeliveryPickupModalStore(
    (state) => state.setReceiverDetails,
  );
  const user = authenticatedUser?.data?.user;
  const initialValues = useMemo<ReceiverDetailsSchemaValues>(
    () => ({
      first_name: user?.receiver?.first_name?.trim() || receiverDetails.firstName,
      last_name: user?.receiver?.last_name?.trim() || receiverDetails.lastName,
      phone_number:
        user?.receiver?.phone_number?.trim() || receiverDetails.phoneNumber,
    }),
    [receiverDetails.firstName, receiverDetails.lastName, receiverDetails.phoneNumber, user],
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
    reset(payload);
    onConfirm?.();
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
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

          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <DeliveryDetailsFormInput
                label="First Name"
                placeholder="First Name"
                errorMessage={errors.first_name?.message}
                register={register("first_name", {
                  validate: (value) => {
                    const result =
                      receiverDetailsSchema.shape.first_name.safeParse(value);
                    return (
                      result.success || result.error.issues[0]?.message
                    );
                  },
                })}
              />

              <DeliveryDetailsFormInput
                label="Last Name"
                placeholder="Last Name"
                errorMessage={errors.last_name?.message}
                register={register("last_name", {
                  validate: (value) => {
                    const result =
                      receiverDetailsSchema.shape.last_name.safeParse(value);
                    return (
                      result.success || result.error.issues[0]?.message
                    );
                  },
                })}
              />
            </div>

            <DeliveryDetailsFormInput
              label="Phone Number"
              placeholder="1234 5678 9564"
              type="tel"
              errorMessage={errors.phone_number?.message}
              register={register("phone_number", {
                validate: (value) => {
                  const result =
                    receiverDetailsSchema.shape.phone_number.safeParse(value);
                  return result.success || result.error.issues[0]?.message;
                },
              })}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          className="h-13.5 min-w-34 rounded-lg bg-primary px-6 text-sm font-medium text-white hover:bg-primary/90 md:text-base"
        >
          {isSubmitting ? <Loader /> : "Confirm"}
        </Button>
      </div>
    </form>
  );
}

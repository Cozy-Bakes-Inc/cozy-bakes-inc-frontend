"use client";

import DeliveryDetailsFormInput from "../delivery/delivery-details-form-input";
import InputErrorMessage from "@/components/ui/input-error-message";
import { Shimmer } from "@/components/ui/shimmer";
import {
  receiverDetailsSchema,
  type ReceiverDetailsSchemaValues,
} from "@/schemas/main/account";
import { formatPhoneDisplay, stripPhoneDigits } from "@/lib";
import type {
  Control,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";
import { Controller } from "react-hook-form";

interface PickupReceiverDetailsSectionProps {
  register: UseFormRegister<ReceiverDetailsSchemaValues>;
  control: Control<ReceiverDetailsSchemaValues>;
  errors: FieldErrors<ReceiverDetailsSchemaValues>;
  isLoading?: boolean;
}

export default function PickupReceiverDetailsSection({
  register,
  control,
  errors,
  isLoading,
}: PickupReceiverDetailsSectionProps) {
  return (
    <section className="rounded-2xl border border-border/24 bg-background p-4 sm:p-5">
      <div className="mb-4">
        <h3 className="text-base font-medium text-primary sm:text-lg">
          Receiver Details
        </h3>
        <p className="mt-1 text-xs text-gray-500 sm:text-sm">
          Add the pickup receiver information so the order is ready for hand
          off at the store.
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Shimmer className="h-20 w-full rounded-lg" />
            <Shimmer className="h-20 w-full rounded-lg" />
          </div>
          <Shimmer className="h-20 w-full rounded-lg" />
        </div>
      ) : (
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
                  return result.success || result.error.issues[0]?.message;
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
                  return result.success || result.error.issues[0]?.message;
                },
              })}
            />
          </div>

          <Controller
            name="phone_number"
            control={control}
            rules={{
              validate: (value) => {
                const result =
                  receiverDetailsSchema.shape.phone_number.safeParse(value);
                return result.success || result.error.issues[0]?.message;
              },
            }}
            render={({ field }) => (
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium text-dark md:text-base">
                  Phone Number
                </span>
                <div className="rounded-lg border border-gray-300 px-3">
                  <input
                    type="tel"
                    placeholder="(212) 555-7890"
                    className="h-14.5 w-full bg-transparent text-sm text-dark outline-none placeholder:text-gray md:text-base"
                    value={formatPhoneDisplay(field.value)}
                    onChange={(e) => field.onChange(stripPhoneDigits(e.target.value))}
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref}
                  />
                </div>
                <InputErrorMessage msg={errors.phone_number?.message} className="pt-0" />
              </label>
            )}
          />
        </div>
      )}
    </section>
  );
}

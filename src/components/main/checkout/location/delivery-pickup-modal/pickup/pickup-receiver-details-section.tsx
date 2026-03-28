"use client";

import DeliveryDetailsFormInput from "../delivery/delivery-details-form-input";
import {
  receiverDetailsSchema,
  type ReceiverDetailsSchemaValues,
} from "@/schemas/main/account";
import type {
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";

interface PickupReceiverDetailsSectionProps {
  register: UseFormRegister<ReceiverDetailsSchemaValues>;
  errors: FieldErrors<ReceiverDetailsSchemaValues>;
}

export default function PickupReceiverDetailsSection({
  register,
  errors,
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
    </section>
  );
}

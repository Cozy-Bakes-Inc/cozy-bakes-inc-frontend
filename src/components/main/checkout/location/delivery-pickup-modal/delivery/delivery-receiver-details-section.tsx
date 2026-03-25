import type { ShippingInformationSchemaValues } from "@/schemas/main/account";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { shippingInformationSchema } from "@/schemas/main/account";
import DeliveryDetailsFormInput from "./delivery-details-form-input";

interface DeliveryReceiverDetailsSectionProps {
  errors: FieldErrors<ShippingInformationSchemaValues>;
  register: UseFormRegister<ShippingInformationSchemaValues>;
}

export default function DeliveryReceiverDetailsSection({
  errors,
  register,
}: DeliveryReceiverDetailsSectionProps) {
  return (
    <section className="rounded-3xl border border-border/24 px-4 py-4 md:px-6">
      <h3 className="mb-4 text-lg font-medium leading-7 text-primary md:text-[18px]">
        Receiver Details
      </h3>

      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <DeliveryDetailsFormInput
            label="First Name"
            placeholder="First Name"
            errorMessage={errors.first_name?.message}
            register={register("first_name", {
              validate: (value) => {
                const result =
                  shippingInformationSchema.shape.first_name.safeParse(value);
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
                  shippingInformationSchema.shape.last_name.safeParse(value);
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
                shippingInformationSchema.shape.phone_number.safeParse(value);
              return result.success || result.error.issues[0]?.message;
            },
          })}
        />
      </div>
    </section>
  );
}

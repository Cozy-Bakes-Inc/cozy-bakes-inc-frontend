import type { ShippingInformationSchemaValues } from "@/schemas/main/account";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { shippingInformationSchema } from "@/schemas/main/account";
import DeliveryDetailsFormInput from "./delivery-details-form-input";

interface DeliveryAddressDetailsSectionProps {
  errors: FieldErrors<ShippingInformationSchemaValues>;
  register: UseFormRegister<ShippingInformationSchemaValues>;
}

export default function DeliveryAddressDetailsSection({
  errors,
  register,
}: DeliveryAddressDetailsSectionProps) {
  return (
    <section className="rounded-3xl border border-border/24 px-4 py-4 md:px-6">
      <h3 className="mb-4 text-lg font-medium leading-7 text-primary md:text-[18px]">
        Address Details
      </h3>

      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <DeliveryDetailsFormInput
            label="Apt & Flower / Vill No"
            placeholder="Apt & Flower / Vill No"
            errorMessage={errors.apt_villa?.message}
            register={register("apt_villa", {
              validate: (value) => {
                const result =
                  shippingInformationSchema.shape.apt_villa.safeParse(value);
                return result.success || result.error.issues[0]?.message;
              },
            })}
          />
          <DeliveryDetailsFormInput
            label="Building / Cluster Name"
            placeholder="Building / Cluster Name"
            errorMessage={errors.building_cluster?.message}
            register={register("building_cluster", {
              validate: (value) => {
                const result =
                  shippingInformationSchema.shape.building_cluster.safeParse(
                    value,
                  );
                return result.success || result.error.issues[0]?.message;
              },
            })}
          />
        </div>

        <DeliveryDetailsFormInput
          label="Street Name / Landmark"
          placeholder="Street Name / Landmark"
          optional
          errorMessage={errors.street_landmark?.message}
          register={register("street_landmark", {
            validate: (value) => {
              const result =
                shippingInformationSchema.shape.street_landmark.safeParse(
                  value,
                );
              return result.success || result.error.issues[0]?.message;
            },
          })}
        />
      </div>
    </section>
  );
}

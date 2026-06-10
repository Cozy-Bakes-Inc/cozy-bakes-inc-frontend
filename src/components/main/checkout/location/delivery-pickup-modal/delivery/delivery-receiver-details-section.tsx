import type { ShippingInformationSchemaValues } from "@/schemas/main/account";
import type { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { Controller } from "react-hook-form";
import { shippingInformationSchema } from "@/schemas/main/account";
import DeliveryDetailsFormInput from "./delivery-details-form-input";
import InputErrorMessage from "@/components/ui/input-error-message";
import { formatPhoneDisplay, stripPhoneDigits } from "@/lib";

interface DeliveryReceiverDetailsSectionProps {
  errors: FieldErrors<ShippingInformationSchemaValues>;
  register: UseFormRegister<ShippingInformationSchemaValues>;
  control: Control<ShippingInformationSchemaValues>;
}

export default function DeliveryReceiverDetailsSection({
  errors,
  register,
  control,
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

        <Controller
          name="phone_number"
          control={control}
          rules={{
            validate: (value) => {
              const result =
                shippingInformationSchema.shape.phone_number.safeParse(value);
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
    </section>
  );
}

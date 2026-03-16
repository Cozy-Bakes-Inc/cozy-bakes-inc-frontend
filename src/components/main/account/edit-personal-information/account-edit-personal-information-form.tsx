"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { Shimmer } from "@/components/ui/shimmer";
import { useAuthenticatedUser } from "@/hooks";
import type { AccountEditPersonalInformationData } from "@/interfaces/main/account";
import {
  editPersonalInformationSchema,
  type EditPersonalInformationSchemaValues,
} from "@/schemas/main/account";
import { updatePersonalInformationAPI } from "@/services/mutations/account/profile";
import { PersonalInformationFieldsRow } from "./personal-information-fields-row";

type AccountEditPersonalInformationFormProps = {
  data: AccountEditPersonalInformationData;
};

const emptyValues: EditPersonalInformationSchemaValues = {
  first_name: "",
  last_name: "",
};

export default function AccountEditPersonalInformationForm({
  data,
}: AccountEditPersonalInformationFormProps) {
  const queryClient = useQueryClient();
  const { data: authenticatedUser, isLoading } = useAuthenticatedUser(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<EditPersonalInformationSchemaValues>({
    defaultValues: emptyValues,
  });

  useEffect(() => {
    const user = authenticatedUser?.data?.user;

    if (!user) return;

    const nextValues = {
      first_name: user.first_name ?? "",
      last_name: user.last_name ?? "",
    };

    reset(nextValues);
  }, [authenticatedUser, reset]);

  const onSubmit = async (formData: EditPersonalInformationSchemaValues) => {
    const initialValues = {
      first_name: authenticatedUser?.data?.user?.first_name?.trim() ?? "",
      last_name: authenticatedUser?.data?.user?.last_name?.trim() ?? "",
    };
    const payload = {
      first_name: formData.first_name.trim(),
      last_name: formData.last_name.trim(),
    };

    if (
      payload.first_name === initialValues.first_name &&
      payload.last_name === initialValues.last_name
    ) {
      reset(initialValues);
      return;
    }

    const result = await updatePersonalInformationAPI(payload);

    if (result?.ok) {
      toast.success(result?.message || "Personal information updated successfully");
      reset(payload);
      await queryClient.invalidateQueries({
        queryKey: ["authenticatedUser"],
      });
      return;
    }

    toast.error(result?.message || "Failed to update personal information");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-3 rounded-2xl bg-background p-3 sm:p-4">
        {isLoading ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Shimmer className="mb-2 h-6 w-28 rounded-md" />
              <Shimmer className="h-14 w-full rounded-lg" />
            </div>
            <div>
              <Shimmer className="mb-2 h-6 w-28 rounded-md" />
              <Shimmer className="h-14 w-full rounded-lg" />
            </div>
          </div>
        ) : (
          <PersonalInformationFieldsRow
            firstNameLabel={data.firstNameLabel}
            lastNameLabel={data.lastNameLabel}
            firstNameRegister={register("first_name", {
              validate: (value) => {
                const result =
                  editPersonalInformationSchema.shape.first_name.safeParse(value);
                return result.success || result.error.issues[0]?.message;
              },
            })}
            lastNameRegister={register("last_name", {
              validate: (value) => {
                const result =
                  editPersonalInformationSchema.shape.last_name.safeParse(value);
                return result.success || result.error.issues[0]?.message;
              },
            })}
            firstNameErrorMessage={errors.first_name?.message}
            lastNameErrorMessage={errors.last_name?.message}
          />
        )}
      </div>

      <Button
        type="submit"
        size="default"
        disabled={isLoading || isSubmitting || !isDirty}
        className="mt-6 h-14 w-full rounded-2xl border border-primary bg-primary text-base font-medium text-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? <Loader /> : data.submitLabel}
      </Button>
    </form>
  );
}

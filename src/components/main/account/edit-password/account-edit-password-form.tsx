"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { useAuthenticatedUser } from "@/hooks";
import type { AccountEditPasswordData } from "@/interfaces/main/account";
import {
  editPasswordSchema,
  type EditPasswordSchemaValues,
} from "@/schemas/main/account";
import { resendOtpSchema } from "@/schemas";
import { sendOrResendOtpAPI } from "@/services/mutations";
import { updatePasswordAPI } from "@/services/mutations/account/profile";
import { createNextEndAt, setResetEmail } from "./constants";
import { PasswordField } from "./password-field";

type AccountEditPasswordFormProps = {
  data: AccountEditPasswordData;
  onForgotPassword: () => void;
};

const defaultValues: EditPasswordSchemaValues = {
  old_password: "",
  new_password: "",
  new_password_confirmation: "",
};

export default function AccountEditPasswordForm({
  data,
  onForgotPassword,
}: AccountEditPasswordFormProps) {
  const { refetch: fetchAuthenticatedUser, isFetching: isUserLoading } =
    useAuthenticatedUser(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSendingResetOtp, setIsSendingResetOtp] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EditPasswordSchemaValues>({
    defaultValues,
  });

  const onSubmit = async (data: EditPasswordSchemaValues) => {
    const result = await updatePasswordAPI(data);

    if (result?.ok) {
      toast.success(result?.message || "Password updated successfully");
      reset(defaultValues);
      return;
    }

    toast.error(result?.message || "Failed to update password");
  };

  const handleForgotPassword = async () => {
    const loadingToastId = toast.loading("Sending verification code...");
    setIsSendingResetOtp(true);
    const authenticatedUserResult = await fetchAuthenticatedUser();
    const email = authenticatedUserResult.data?.data?.user?.email ?? "";
    const parsed = resendOtpSchema.safeParse({ email });

    if (!parsed.success) {
      setIsSendingResetOtp(false);
      toast.dismiss(loadingToastId);
      toast.error(parsed.error.issues[0]?.message);
      return;
    }

    const result = await sendOrResendOtpAPI(parsed.data);

    if (result?.ok) {
      setResetEmail(email);
      createNextEndAt();
      toast.dismiss(loadingToastId);
      toast.success(result.message || "Verification code sent");
      onForgotPassword();
      setIsSendingResetOtp(false);
      return;
    }

    toast.dismiss(loadingToastId);
    toast.error(result?.message || "Failed to send verification code");
    setIsSendingResetOtp(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-3 rounded-2xl bg-background p-3 sm:p-4">
        <div className="space-y-4 sm:space-y-5">
          <PasswordField
            label={data.oldPasswordLabel}
            placeholder={data.oldPasswordPlaceholder}
            register={register("old_password", {
              validate: (value) => {
                const result =
                  editPasswordSchema.shape.old_password.safeParse(value);
                return result.success || result.error.issues[0]?.message;
              },
            })}
            errorMessage={errors.old_password?.message}
            showPassword={showOldPassword}
            onToggleShowPassword={() => setShowOldPassword((value) => !value)}
          />

          <PasswordField
            label={data.newPasswordLabel}
            placeholder={data.newPasswordPlaceholder}
            register={register("new_password", {
              validate: (value) => {
                const result =
                  editPasswordSchema.shape.new_password.safeParse(value);
                return result.success || result.error.issues[0]?.message;
              },
            })}
            errorMessage={errors.new_password?.message}
            showPassword={showNewPassword}
            onToggleShowPassword={() => setShowNewPassword((value) => !value)}
          />

          <PasswordField
            label={data.confirmPasswordLabel}
            placeholder={data.confirmPasswordPlaceholder}
            register={register("new_password_confirmation", {
              validate: (value, formValues) => {
                const fieldResult =
                  editPasswordSchema.shape.new_password_confirmation.safeParse(
                    value,
                  );

                if (!fieldResult.success) {
                  return fieldResult.error.issues[0]?.message;
                }

                const schemaResult = editPasswordSchema.safeParse({
                  old_password: formValues.old_password,
                  new_password: formValues.new_password,
                  new_password_confirmation: value,
                });

                return (
                  schemaResult.success ||
                  schemaResult.error.issues[0]?.message ||
                  "Invalid password confirmation"
                );
              },
            })}
            errorMessage={errors.new_password_confirmation?.message}
            showPassword={showConfirmPassword}
            onToggleShowPassword={() =>
              setShowConfirmPassword((value) => !value)
            }
          />
        </div>

        <div className="mt-5 flex justify-end">
          <Button
            type="button"
            variant="ghost"
            size="default"
            onClick={handleForgotPassword}
            disabled={isSendingResetOtp || isUserLoading}
            className="h-auto px-0 py-0 text-base font-medium text-dark hover:bg-transparent hover:text-primary"
          >
            {data.forgotPasswordLabel}
          </Button>
        </div>
      </div>

      <Button
        type="submit"
        size="default"
        disabled={isSubmitting}
        className="mt-6 h-14 w-full rounded-2xl border border-primary bg-primary text-base font-medium text-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]"
      >
        {isSubmitting ? <Loader /> : data.submitLabel}
      </Button>
    </form>
  );
}

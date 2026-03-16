"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import type { AccountEditPasswordData } from "@/interfaces/main/account";
import { NewPasswordField } from "@/components/auth/new-password/components/new-password-field";
import Loader from "@/components/ui/loader";
import { Button } from "@/components/ui/button";
import { resetPasswordSchema, type ResetPasswordSchemaValues } from "@/schemas";
import { resetPasswordAPI, sendOrResendOtpAPI } from "@/services/mutations";
import {
  clearResetContext,
  createNextEndAt,
  getResetContext,
  getOrCreateEndAt,
  getSecondsLeft,
} from "./constants";

type ResetPasswordSectionProps = {
  data: AccountEditPasswordData;
  onExpired: () => void;
  onSuccess: () => void;
};

export default function ResetPasswordSection({
  data,
  onExpired,
  onSuccess,
}: ResetPasswordSectionProps) {
  const hasHandledExpiredSessionRef = useRef(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordSchemaValues>({
    defaultValues: {
      email: "",
      otp: "",
      password: "",
      password_confirmation: "",
    },
  });

  const newPassword = watch("password");
  const confirmNewPassword = watch("password_confirmation");

  useEffect(() => {
    const handleExpiredSession = () => {
      if (hasHandledExpiredSessionRef.current) return;

      hasHandledExpiredSessionRef.current = true;
      clearResetContext();
      toast.error("Reset password session expired");
      onExpired();
    };

    const storedContext = getResetContext();
    if (!storedContext) {
      handleExpiredSession();
      return;
    }

    try {
      if (!storedContext.email || !storedContext.otp) {
        throw new Error("Invalid reset context");
      }

      setValue("email", storedContext.email);
      setValue("otp", storedContext.otp);
    } catch {
      clearResetContext();
      handleExpiredSession();
    }
  }, [onExpired, setValue]);

  useEffect(() => {
    const endAt = getOrCreateEndAt();
    const checkExpiration = () => {
      if (getSecondsLeft(endAt) > 0) return;

      if (hasHandledExpiredSessionRef.current) return;

      hasHandledExpiredSessionRef.current = true;
      clearResetContext();
      toast.error("Verification code expired");
      onExpired();
    };

    checkExpiration();
    const interval = window.setInterval(checkExpiration, 1000);

    return () => window.clearInterval(interval);
  }, [onExpired]);

  const onSubmit = async (formData: ResetPasswordSchemaValues) => {
    const validationResult = resetPasswordSchema.safeParse(formData);
    if (!validationResult.success) {
      const firstIssue = validationResult.error.issues[0];
      toast.error(firstIssue?.message || "Invalid form data");
      return;
    }

    const result = await resetPasswordAPI(validationResult.data);

    if (result?.ok) {
      clearResetContext();
      toast.success(result?.message || "Password changed successfully");
      onSuccess();
      return;
    }

    if (result?.message === "Invalid or expired OTP.") {
      toast.error(result.message);

      const resendResult = await sendOrResendOtpAPI({ email: formData.email });
      if (resendResult?.ok) {
        createNextEndAt();
        toast.success(resendResult.message || "Verification code sent");
      } else {
        toast.error(
          resendResult?.message || "Failed to resend verification code",
        );
      }
      onExpired();
      return;
    }

    toast.error(result?.message);
  };

  return (
    <form className="mt-3 space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="rounded-2xl bg-background p-3 sm:p-4">
        <div className="space-y-4 sm:space-y-6">
          <NewPasswordField
            label={data.newPasswordLabel}
            placeholder={data.newPasswordPlaceholder}
            value={newPassword}
            showPassword={showNewPassword}
            onValueChange={(value) =>
              setValue("password", value, {
                shouldDirty: true,
                shouldValidate: true,
              })
            }
            onToggleShowPassword={() => setShowNewPassword((value) => !value)}
            errorMessage={errors.password?.message}
          />

          <NewPasswordField
            label={data.confirmPasswordLabel}
            placeholder={data.confirmPasswordPlaceholder}
            value={confirmNewPassword}
            showPassword={showConfirmPassword}
            onValueChange={(value) =>
              setValue("password_confirmation", value, {
                shouldDirty: true,
                shouldValidate: true,
              })
            }
            onToggleShowPassword={() =>
              setShowConfirmPassword((value) => !value)
            }
            errorMessage={errors.password_confirmation?.message}
          />
        </div>
      </div>

      <Button
        type="submit"
        size="default"
        className="h-14 w-full rounded-lg border border-primary bg-primary text-base font-medium text-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]"
      >
        {isSubmitting ? <Loader /> : data.submitLabel}
      </Button>
    </form>
  );
}

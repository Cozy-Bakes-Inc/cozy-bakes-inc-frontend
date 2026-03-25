"use client";

import { memo, useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { VerifyOtpInput } from "@/components/auth/verify-otp/components/verify-otp-input";
import { formatTimer } from "@/lib/utils/time";
import { resendOtpSchema } from "@/schemas";
import {
  verifyEditEmailSchema,
  type VerifyEditEmailSchemaValues,
} from "@/schemas/main/account";
import { sendOrResendOtpAPI } from "@/services/mutations";
import { updateEmailAPI } from "@/services/mutations/account/profile";
import {
  clearPendingEditEmail,
  createNextEditEmailEndAt,
  getEditEmailSecondsLeft,
  getOrCreateEditEmailEndAt,
} from "./constants";

type AccountEditEmailVerificationSectionProps = {
  currentEmail: string;
  newEmail: string;
  onSuccess: () => void;
  onNewEmailTaken: () => void;
};

type ResendCodeStatusProps = {
  isResending: boolean;
  forceShowResend: boolean;
  onResend: () => Promise<number | null>;
};

const ResendCodeStatus = memo(function ResendCodeStatus({
  isResending,
  forceShowResend,
  onResend,
}: ResendCodeStatusProps) {
  const [endAt, setEndAt] = useState(() => getOrCreateEditEmailEndAt());
  const [secondsLeft, setSecondsLeft] = useState(() =>
    getEditEmailSecondsLeft(endAt),
  );

  useEffect(() => {
    const interval = window.setInterval(() => {
      setSecondsLeft(getEditEmailSecondsLeft(endAt));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [endAt]);

  const handleResend = async () => {
    const nextEndAt = await onResend();
    if (!nextEndAt) return;

    setEndAt(nextEndAt);
    setSecondsLeft(getEditEmailSecondsLeft(nextEndAt));
  };

  if (forceShowResend || secondsLeft === 0) {
    return (
      <p className="text-center text-base font-medium text-gray">
        Send Code again :{" "}
        <Button
          type="button"
          onClick={handleResend}
          variant="ghost"
          disabled={isResending}
          className="h-auto p-0 font-semibold text-dark hover:bg-transparent hover:text-primary"
        >
          {isResending ? "Resending..." : "Resend Code"}
        </Button>
      </p>
    );
  }

  return (
    <p className="text-center text-base font-medium text-gray">
      Send Code again :{" "}
      <span className="font-semibold text-dark">
        {formatTimer(secondsLeft)}
      </span>
    </p>
  );
});

export default function AccountEditEmailVerificationSection({
  currentEmail,
  newEmail,
  onSuccess,
  onNewEmailTaken,
}: AccountEditEmailVerificationSectionProps) {
  const queryClient = useQueryClient();
  const [isResending, setIsResending] = useState(false);
  const [forceShowResend, setForceShowResend] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<VerifyEditEmailSchemaValues>({
    defaultValues: {
      new_email: "",
      otp: "",
    },
  });

  const emailRegister = register("new_email", {
    validate: (value) => {
      const result = verifyEditEmailSchema.shape.new_email.safeParse(value);
      return result.success || result.error.issues[0]?.message;
    },
  });

  register("otp", {
    validate: (value) => {
      const result = verifyEditEmailSchema.shape.otp.safeParse(value);
      return result.success || result.error.issues[0]?.message;
    },
  });

  const otp = useWatch({
    control,
    name: "otp",
  });

  useEffect(() => {
    setValue("new_email", newEmail, { shouldValidate: true });
  }, [newEmail, setValue]);

  const onSubmit = async (data: VerifyEditEmailSchemaValues) => {
    const result = await updateEmailAPI({
      otp: data.otp.trim(),
      new_email: data.new_email.trim(),
    });

    if (!result?.ok) {
      const message = result?.message || "Failed to update email";

      if (message.toLowerCase().includes("invalid otp")) {
        setForceShowResend(true);
      }

      if (message.toLowerCase().includes("new email has already been taken")) {
        toast.error(message);
        onNewEmailTaken();
        return;
      }

      toast.error(message);
      return;
    }

    clearPendingEditEmail();
    await queryClient.invalidateQueries({
      queryKey: ["authenticatedUser"],
    });
    toast.success(result?.message || "Email updated successfully");
    onSuccess();
  };

  const handleResendCode = async () => {
    const parsed = resendOtpSchema.safeParse({ email: currentEmail });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message);
      return null;
    }

    setIsResending(true);
    const result = await sendOrResendOtpAPI(parsed.data);
    if (result?.ok) {
      setForceShowResend(false);
      toast.success(result?.message || "Verification code resent");
      const nextEndAt = createNextEditEmailEndAt();
      setIsResending(false);
      return nextEndAt;
    }

    toast.error(result?.message || "Failed to resend verification code");
    setIsResending(false);
    return null;
  };

  return (
    <form className="mt-3 space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <input type="hidden" {...emailRegister} value={newEmail} />
      <div className="rounded-2xl bg-background px-4 py-6 sm:px-6">
        <div className="mx-auto flex w-full max-w-145 flex-col items-center gap-8">
          <p className="text-center text-lg font-medium leading-7 text-[#667085]">
            We&apos;ve sent a verification code to{" "}
            <span className="font-semibold text-dark">{currentEmail}</span>.
            Please enter the code below to proceed.
          </p>

          <div className="w-full space-y-5">
            <VerifyOtpInput
              otp={otp || ""}
              onOtpChange={(value) => {
                setValue("otp", value, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }}
              errorMessage={errors.otp?.message || errors.new_email?.message}
            />
            <ResendCodeStatus
              isResending={isResending}
              forceShowResend={forceShowResend}
              onResend={handleResendCode}
            />
          </div>
        </div>
      </div>

      <Button
        type="submit"
        size="default"
        disabled={!currentEmail || !newEmail || isSubmitting}
        className="h-14 w-full rounded-lg border border-primary bg-primary text-base font-medium text-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]"
      >
        {isSubmitting ? <Loader /> : "Verify Your Email"}
      </Button>
    </form>
  );
}

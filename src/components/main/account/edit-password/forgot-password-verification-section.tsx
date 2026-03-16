"use client";

import { memo, useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { VerifyOtpInput } from "@/components/auth/verify-otp/components/verify-otp-input";
import { formatTimer } from "@/lib/utils/time";
import {
  resendOtpSchema,
  verifyOtpSchema,
  type VerifyOtpSchemaValues,
} from "@/schemas";
import { sendOrResendOtpAPI } from "@/services/mutations";
import toast from "react-hot-toast";
import {
  createNextEndAt,
  getResetEmail,
  getOrCreateEndAt,
  getSecondsLeft,
  setResetContext,
} from "./constants";

type ForgotPasswordVerificationSectionProps = {
  onVerify: () => void;
};

type ResendCodeStatusProps = {
  isResending: boolean;
  onResend: () => Promise<number | null>;
};

const ResendCodeStatus = memo(function ResendCodeStatus({
  isResending,
  onResend,
}: ResendCodeStatusProps) {
  const [endAt, setEndAt] = useState(() => getOrCreateEndAt());
  const [secondsLeft, setSecondsLeft] = useState(() => getSecondsLeft(endAt));

  useEffect(() => {
    const interval = window.setInterval(() => {
      setSecondsLeft(getSecondsLeft(endAt));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [endAt]);

  const handleResend = async () => {
    const nextEndAt = await onResend();
    if (!nextEndAt) return;

    setEndAt(nextEndAt);
    setSecondsLeft(getSecondsLeft(nextEndAt));
  };

  if (secondsLeft === 0) {
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
      <span className="font-semibold text-dark">{formatTimer(secondsLeft)}</span>
    </p>
  );
});

export default function ForgotPasswordVerificationSection({
  onVerify,
}: ForgotPasswordVerificationSectionProps) {
  const [email] = useState(() => getResetEmail() ?? "");
  const [isResending, setIsResending] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<VerifyOtpSchemaValues>({
    defaultValues: {
      email: "",
      otp: "",
    },
  });

  const emailRegister = register("email", {
    validate: (value) => {
      const result = verifyOtpSchema.shape.email.safeParse(value);
      return result.success || result.error.issues[0]?.message;
    },
  });

  register("otp", {
    validate: (value) => {
      const result = verifyOtpSchema.shape.otp.safeParse(value);
      return result.success || result.error.issues[0]?.message;
    },
  });

  const otp = useWatch({
    control,
    name: "otp",
  });

  useEffect(() => {
    setValue("email", email, { shouldValidate: true });
  }, [email, setValue]);

  const onSubmit = async (formData: VerifyOtpSchemaValues) => {
    setResetContext(formData.email, formData.otp);
    toast.success("Verification code confirmed");
    onVerify();
  };

  const handleResendCode = async () => {
    const parsed = resendOtpSchema.safeParse({ email });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message);
      return null;
    }

    setIsResending(true);
    const result = await sendOrResendOtpAPI(parsed.data);
    if (result?.ok) {
      toast.success(result?.message || "Verification code resent");
      const nextEndAt = createNextEndAt();
      setIsResending(false);
      return nextEndAt;
    }

    toast.error(result?.message);
    setIsResending(false);
    return null;
  };

  return (
    <form className="mt-3 space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <input type="hidden" {...emailRegister} value={email} />
      <div className="rounded-2xl bg-background px-4 py-6 sm:px-6">
        <div className="mx-auto flex w-full max-w-145 flex-col items-center gap-8">
          <p className="text-center text-lg font-medium leading-7 text-[#667085]">
            We&apos;ve sent a verification code to{" "}
            <span className="font-semibold text-dark">{email}</span>
            . Please enter the code below to proceed.
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
              errorMessage={errors.otp?.message || errors.email?.message}
            />
            <ResendCodeStatus
              isResending={isResending}
              onResend={handleResendCode}
            />
          </div>
        </div>
      </div>

      <Button
        type="submit"
        size="default"
        disabled={!email}
        className="h-14 w-full rounded-lg border border-primary bg-primary text-base font-medium text-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]"
      >
        {isSubmitting ? <Loader /> : "Next"}
      </Button>
    </form>
  );
}

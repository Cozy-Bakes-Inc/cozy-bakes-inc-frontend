"use client";

import { type FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { VerifyOtpInput } from "./components/verify-otp-input";
import { useRouter } from "next/navigation";

type VerifyOtpFormProps = {
  canResendCode: boolean;
  timerText: string;
  onResendCode: () => void;
};

export function VerifyOtpForm({
  canResendCode,
  timerText,
  onResendCode,
}: VerifyOtpFormProps) {
  const router = useRouter();
  const [otp, setOtp] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  const handleVerify = () => {
    router.push("/new-password");
  };
  return (
    <form className="w-full space-y-8" onSubmit={handleSubmit}>
      <VerifyOtpInput otp={otp} onOtpChange={setOtp} />

      <div className="space-y-4">
        <Button
          onClick={handleVerify}
          type="submit"
          className="h-13.75 w-full rounded-2xl bg-primary px-8 text-[18px] font-medium text-white"
        >
          Verify
        </Button>

        {canResendCode ? (
          <p className="text-center text-base leading-6 font-medium text-[gray]">
            Send Code again :{" "}
            <button
              type="button"
              onClick={onResendCode}
              className="font-semibold text-dark transition-colors hover:text-primary"
            >
              Resend Code
            </button>
          </p>
        ) : (
          <p className="text-center text-base leading-6 font-medium text-[gray]">
            Send Code again : {timerText}
          </p>
        )}
      </div>
    </form>
  );
}

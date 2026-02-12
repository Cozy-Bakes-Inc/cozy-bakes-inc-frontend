"use client";

import Link from "next/link";
import { type FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { ForgotPasswordEmailField } from "./components/forgot-password-email-field";
import { useRouter } from "next/navigation";

export function ForgotPasswordForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleVerifyOtp = () => {
    router.push("/verify-otp");
  };
  return (
    <form className="w-full space-y-5" onSubmit={handleSubmit}>
      <ForgotPasswordEmailField email={email} onEmailChange={setEmail} />

      <Button
        onClick={handleVerifyOtp}
        type="submit"
        className="h-13.75 w-full rounded-2xl bg-primary px-8 text-[18px] font-medium text-white"
      >
        Send Verification Code
      </Button>

      <div className="flex items-center justify-center">
        <Link
          href="/login"
          className="border-b border-primary text-base leading-7 font-semibold text-primary"
        >
          Back To Login
        </Link>
      </div>
    </form>
  );
}

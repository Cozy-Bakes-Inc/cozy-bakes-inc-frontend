"use client";

import Link from "next/link";
import { Mail } from "lucide-react";

export default function ForgotPasswordPage() {
  return (
    <div className="pt-2 sm:pt-20">
      <h1 className="text-[30px] leading-[38px] font-semibold text-dark">
        Forgot your <span className="text-primary">password?</span>
      </h1>
      <p className="mt-2 text-sm leading-6 text-[#667085]">
        Don&apos;t worry! Enter your registered email address, and we&apos;ll send
        an OTP code to reset your password.
      </p>

      <form className="mt-6 space-y-3">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-dark">Email</label>
          <div className="flex h-11 items-center gap-2 rounded-[10px] border border-primary/50 px-3">
            <Mail className="size-4 text-primary" />
            <input
              type="email"
              placeholder="Cozy Bakes@gmail.com"
              className="w-full bg-transparent text-sm text-dark placeholder:text-[#98A2B3] outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className="h-[50px] w-full rounded-[10px] bg-primary text-base font-medium text-white"
        >
          Continue
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-[#667085]">
        Forgot Password?{" "}
        <Link href="/login" className="font-semibold text-primary">
          Back To Login
        </Link>
      </p>
    </div>
  );
}


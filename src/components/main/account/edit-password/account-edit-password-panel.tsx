"use client";

import { useState } from "react";
import type { AccountEditPasswordData } from "@/interfaces/main/account";
import ForgotPasswordVerificationSection from "./forgot-password-verification-section";
import ResetPasswordSection from "./reset-password-section";
import AccountEditPasswordForm from "./account-edit-password-form";

type AccountEditPasswordPanelProps = {
  data: AccountEditPasswordData;
};

export default function AccountEditPasswordPanel({
  data,
}: AccountEditPasswordPanelProps) {
  const [step, setStep] = useState<"edit" | "otp" | "reset">("edit");

  const sectionTitle = step === "otp" ? "Forget Password" : data.sectionTitle;

  return (
    <section className="mt-4 rounded-3xl bg-bg-creamy p-3 sm:p-6">
      <div className="rounded-3xl border border-border/24 p-4 sm:p-6">
        <h3 className="text-xl font-medium text-primary">{sectionTitle}</h3>

        {step === "otp" ? (
          <ForgotPasswordVerificationSection
            onVerify={() => setStep("reset")}
          />
        ) : step === "reset" ? (
          <ResetPasswordSection
            data={data}
            onExpired={() => setStep("otp")}
            onSuccess={() => setStep("edit")}
          />
        ) : (
          <AccountEditPasswordForm
            data={data}
            onForgotPassword={() => setStep("otp")}
          />
        )}
      </div>
    </section>
  );
}

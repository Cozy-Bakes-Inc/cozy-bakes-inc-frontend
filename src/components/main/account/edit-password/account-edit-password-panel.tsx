"use client";

import { useState } from "react";
import { Eye, LockKeyhole } from "lucide-react";
import type { AccountEditPasswordData } from "@/interfaces/main/account";
import { Button } from "@/components/ui/button";
import ForgotPasswordVerificationSection from "./forgot-password-verification-section";
import ResetPasswordSection from "./reset-password-section";

type AccountEditPasswordPanelProps = {
  data: AccountEditPasswordData;
};

type PasswordFieldProps = {
  label: string;
  placeholder: string;
};

function PasswordField({ label, placeholder }: PasswordFieldProps) {
  return (
    <div className="space-y-2">
      <p className="text-base font-medium text-dark">{label}</p>
      <div className="flex min-h-14 items-center gap-2 rounded-lg border border-gray bg-background px-3">
        <LockKeyhole className="size-5 shrink-0 text-primary" />
        <p className="flex-1 text-base font-medium text-gray">{placeholder}</p>
        <Eye className="size-5 shrink-0 text-primary" />
      </div>
    </div>
  );
}

export default function AccountEditPasswordPanel({
  data,
}: AccountEditPasswordPanelProps) {
  const [step, setStep] = useState<"edit" | "otp" | "reset">("edit");

  const sectionTitle = step === "otp" ? "Forget Password" : data.sectionTitle;

  return (
    <section className="mt-4 rounded-3xl bg-bg-creamy p-3 sm:p-6">
      <div className="rounded-3xl border border-border/24 p-4 sm:p-6">
        <h3 className="text-xl font-medium text-primary">
          {sectionTitle}
        </h3>

        {step === "otp" ? (
          <ForgotPasswordVerificationSection
            email="Cozy Bakes@gmail.com"
            onVerify={() => setStep("reset")}
          />
        ) : step === "reset" ? (
          <ResetPasswordSection data={data} />
        ) : (
          <>
            <div className="mt-3 rounded-2xl bg-background p-3 sm:p-4">
              <div className="space-y-4 sm:space-y-5">
                <PasswordField
                  label={data.oldPasswordLabel}
                  placeholder={data.oldPasswordPlaceholder}
                />
                <PasswordField
                  label={data.newPasswordLabel}
                  placeholder={data.newPasswordPlaceholder}
                />
                <PasswordField
                  label={data.confirmPasswordLabel}
                  placeholder={data.confirmPasswordPlaceholder}
                />
              </div>

              <div className="mt-5 flex justify-end">
                <Button
                  type="button"
                  variant="ghost"
                  size="default"
                  onClick={() => setStep("otp")}
                  className="h-auto px-0 py-0 text-base font-medium text-dark hover:bg-transparent hover:text-primary"
                >
                  {data.forgotPasswordLabel}
                </Button>
              </div>
            </div>

            <Button
              type="button"
              size="default"
              className="mt-6 h-14 w-full rounded-2xl border border-primary bg-primary text-base font-medium text-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]"
            >
              {data.submitLabel}
            </Button>
          </>
        )}
      </div>
    </section>
  );
}

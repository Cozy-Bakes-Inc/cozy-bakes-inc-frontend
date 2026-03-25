"use client";

import { useState } from "react";
import type { AccountEditEmailData } from "@/interfaces/main/account";
import AccountEditEmailForm from "./edit-email/account-edit-email-form";
import AccountEditEmailVerificationSection from "./edit-email/account-edit-email-verification-section";
import type { PendingEditEmailContext } from "./edit-email/constants";

type AccountEditEmailPanelProps = {
  data: AccountEditEmailData;
};

export default function AccountEditEmailPanel({
  data,
}: AccountEditEmailPanelProps) {
  const [pendingContext, setPendingContext] =
    useState<PendingEditEmailContext | null>(null);
  const [step, setStep] = useState<"edit" | "otp">("edit");

  return (
    <section className="mt-4 rounded-3xl bg-bg-creamy p-3 sm:p-6">
      <div className="rounded-3xl border border-border/24 p-4 sm:p-6">
        <h3 className="text-xl font-medium text-primary">
          {step === "otp" ? "Verify Your Email" : data.sectionTitle}
        </h3>

        {step === "otp" ? (
          <AccountEditEmailVerificationSection
            key={`${pendingContext?.currentEmail}-${pendingContext?.newEmail}`}
            currentEmail={pendingContext?.currentEmail ?? ""}
            newEmail={pendingContext?.newEmail ?? ""}
            onSuccess={() => {
              setPendingContext(null);
              setStep("edit");
            }}
            onNewEmailTaken={() => {
              setStep("edit");
            }}
          />
        ) : (
          <AccountEditEmailForm
            data={data}
            onSuccess={(context) => {
              setPendingContext(context);
              setStep("otp");
            }}
          />
        )}
      </div>
    </section>
  );
}

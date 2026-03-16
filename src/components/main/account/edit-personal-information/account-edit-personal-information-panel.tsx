"use client";

import type { AccountEditPersonalInformationData } from "@/interfaces/main/account";
import AccountEditPersonalInformationForm from "./account-edit-personal-information-form";

type AccountEditPersonalInformationPanelProps = {
  data: AccountEditPersonalInformationData;
};

export default function AccountEditPersonalInformationPanel({
  data,
}: AccountEditPersonalInformationPanelProps) {
  return (
    <section className="mt-4 rounded-3xl bg-bg-creamy p-3 sm:p-6">
      <div className="rounded-3xl border border-border/24 p-4 sm:p-6">
        <h3 className="text-xl font-medium text-primary">
          {data.sectionTitle}
        </h3>
        <AccountEditPersonalInformationForm data={data} />
      </div>
    </section>
  );
}

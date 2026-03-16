"use client";

import type { UseFormRegisterReturn } from "react-hook-form";
import InputErrorMessage from "@/components/ui/input-error-message";

type PersonalInformationFieldsRowProps = {
  firstNameLabel: string;
  lastNameLabel: string;
  firstNameRegister: UseFormRegisterReturn<"first_name">;
  lastNameRegister: UseFormRegisterReturn<"last_name">;
  firstNameErrorMessage?: string;
  lastNameErrorMessage?: string;
};

export function PersonalInformationFieldsRow({
  firstNameLabel,
  lastNameLabel,
  firstNameRegister,
  lastNameRegister,
  firstNameErrorMessage,
  lastNameErrorMessage,
}: PersonalInformationFieldsRowProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div>
        <label className="mb-2 block text-base font-medium text-dark">
          {firstNameLabel}
        </label>
        <div className="flex h-14 items-center rounded-lg border border-primary/90 bg-background px-3">
          <input
            {...firstNameRegister}
            type="text"
            placeholder={firstNameLabel}
            className="w-full bg-transparent text-sm font-medium text-dark outline-none placeholder:text-gray"
          />
        </div>
        <InputErrorMessage msg={firstNameErrorMessage} />
      </div>

      <div>
        <label className="mb-2 block text-base font-medium text-dark">
          {lastNameLabel}
        </label>
        <div className="flex h-14 items-center rounded-lg border border-primary/90 bg-background px-3">
          <input
            {...lastNameRegister}
            type="text"
            placeholder={lastNameLabel}
            className="w-full bg-transparent text-sm font-medium text-dark outline-none placeholder:text-gray"
          />
        </div>
        <InputErrorMessage msg={lastNameErrorMessage} />
      </div>
    </div>
  );
}

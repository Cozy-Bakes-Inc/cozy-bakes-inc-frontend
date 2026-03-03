import { Eye, LockKeyhole } from "lucide-react";
import type { AccountEditPasswordData } from "@/interfaces/main/account";
import { Button } from "@/components/ui/button";

type ResetPasswordSectionProps = {
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
      <div className="flex min-h-14 items-center gap-2 rounded-lg border border-primary bg-[#FBF8EB14] px-3">
        <LockKeyhole className="size-5 shrink-0 text-primary" />
        <p className="flex-1 text-3.5 font-medium text-dark">{placeholder}</p>
        <Eye className="size-5 shrink-0 text-primary" />
      </div>
    </div>
  );
}

export default function ResetPasswordSection({ data }: ResetPasswordSectionProps) {
  return (
    <div className="mt-3 space-y-6">
      <div className="rounded-2xl bg-background p-3 sm:p-4">
        <div className="space-y-4 sm:space-y-6">
          <PasswordField
            label={data.newPasswordLabel}
            placeholder={data.newPasswordPlaceholder}
          />
          <PasswordField
            label={data.confirmPasswordLabel}
            placeholder={data.confirmPasswordPlaceholder}
          />
        </div>
      </div>

      <Button
        type="button"
        size="default"
        className="h-14 w-full rounded-lg border border-primary bg-primary text-base font-medium text-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]"
      >
        {data.submitLabel}
      </Button>
    </div>
  );
}

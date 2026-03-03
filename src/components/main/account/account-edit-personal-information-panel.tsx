import type { AccountEditPersonalInformationData } from "@/interfaces/main/account";
import { Button } from "@/components/ui/button";

type AccountEditPersonalInformationPanelProps = {
  data: AccountEditPersonalInformationData;
};

type ReadOnlyFieldProps = {
  label: string;
  value: string;
};

function ReadOnlyField({ label, value }: ReadOnlyFieldProps) {
  return (
    <div className="space-y-2">
      <p className="text-base font-medium text-dark">{label}</p>
      <div className="flex min-h-14 items-center rounded-lg border border-primary/90 bg-background px-3">
        <p className="text-sm font-medium text-dark">{value}</p>
      </div>
    </div>
  );
}

export default function AccountEditPersonalInformationPanel({
  data,
}: AccountEditPersonalInformationPanelProps) {
  return (
    <section className="mt-4 rounded-3xl bg-bg-creamy p-3 sm:p-6">
      <div className="rounded-3xl border border-border/24 p-4 sm:p-6">
        <h3 className="text-xl font-medium text-primary">{data.sectionTitle}</h3>

        <div className="mt-3 rounded-2xl bg-background p-3 sm:p-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <ReadOnlyField label={data.firstNameLabel} value={data.firstName} />
            <ReadOnlyField label={data.lastNameLabel} value={data.lastName} />
          </div>
        </div>

        <Button
          type="button"
          size="default"
          className="mt-6 h-14 w-full rounded-2xl border border-primary bg-primary text-base font-medium text-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]"
        >
          {data.submitLabel}
        </Button>
      </div>
    </section>
  );
}

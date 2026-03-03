import { ArrowUpDown, MapPin } from "lucide-react";
import type { ReactNode } from "react";
import type { AccountShippingInformationData } from "@/interfaces/main/account";
import { Button } from "@/components/ui/button";

type AccountShippingInformationPanelProps = {
  data: AccountShippingInformationData;
};

type ReadOnlyFieldProps = {
  label: string;
  value: string;
  trailing?: ReactNode;
};

function ReadOnlyField({ label, value, trailing }: ReadOnlyFieldProps) {
  return (
    <div className="space-y-2">
      <p className="text-base font-medium text-dark">{label}</p>
      <div className="flex min-h-14 items-center justify-between gap-2 rounded-lg border border-primary/90 bg-background px-3">
        <p className="text-sm font-medium text-dark">{value}</p>
        {trailing}
      </div>
    </div>
  );
}

export default function AccountShippingInformationPanel({
  data,
}: AccountShippingInformationPanelProps) {
  return (
    <section className="mt-4 rounded-3xl bg-bg-creamy p-3 sm:p-6">
      <div className="rounded-3xl border border-border/24 p-4 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-xl font-medium text-primary">
            {data.sectionTitle}
          </h3>
          <Button
            type="button"
            variant="ghost"
            size="default"
            className="inline-flex h-auto shrink-0 items-center gap-2 px-0 py-0 text-xs font-medium text-gray hover:bg-transparent hover:text-dark sm:text-sm"
          >
            <ArrowUpDown className="size-4 shrink-0 text-gray" />
            {data.address.changeAddressLabel}
          </Button>
        </div>

        <article className="mt-3 rounded-2xl border border-border/24 bg-background p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-bg-creamy text-primary">
              <MapPin className="size-5 shrink-0" />
            </span>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-primary">
                {data.address.deliverToLabel}
              </p>
              <p className="text-[28px] font-semibold leading-8 text-dark sm:text-[30px]">
                {data.address.city}
              </p>
              <p className="mt-1 text-sm font-medium text-gray">
                {data.address.fullAddress}
              </p>
            </div>
          </div>
        </article>

        <div className="mt-4">
          <h3 className="text-xl font-medium text-primary">
            {data.receiver.title}
          </h3>

          <div className="mt-3 rounded-2xl bg-background p-3 sm:p-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <ReadOnlyField
                label={data.receiver.firstNameLabel}
                value={data.receiver.firstName}
              />
              <ReadOnlyField
                label={data.receiver.lastNameLabel}
                value={data.receiver.lastName}
              />
            </div>

            <div className="mt-4">
              <ReadOnlyField
                label={data.receiver.phoneLabel}
                value={data.receiver.phoneNumber}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

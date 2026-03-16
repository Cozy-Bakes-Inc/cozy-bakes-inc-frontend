"use client";

import { useAuthenticatedUser } from "@/hooks";
import type { AccountPersonalInformationData } from "@/interfaces/main/account";
import { Shimmer } from "@/components/ui/shimmer";

type AccountPersonalInformationPanelProps = {
  data: AccountPersonalInformationData;
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

export default function AccountPersonalInformationPanel({
  data,
}: AccountPersonalInformationPanelProps) {
  const { data: authenticatedUser, isLoading } = useAuthenticatedUser(true);
  const user = authenticatedUser?.data?.user;
  const firstName = user?.first_name ?? data.firstName;
  const lastName = user?.last_name ?? data.lastName;
  const email = user?.email ?? data.email;

  return (
    <section className="mt-4 rounded-3xl bg-bg-creamy p-3 sm:p-6">
      <div className="rounded-3xl border border-border/24 p-4 sm:p-6">
        <h3 className="text-xl font-medium text-primary">
          {data.sectionTitle}
        </h3>

        <div className="mt-3 rounded-2xl bg-background p-3 sm:p-4">
          {isLoading ? (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                {Array.from({ length: 2 }).map((_, index) => (
                  <div key={index} className="space-y-2">
                    <Shimmer className="h-6 w-28 rounded-md" />
                    <Shimmer className="h-14 w-full rounded-lg" />
                  </div>
                ))}
              </div>

              <div className="mt-4 space-y-2">
                <Shimmer className="h-6 w-28 rounded-md" />
                <Shimmer className="h-14 w-full rounded-lg" />
              </div>
            </>
          ) : (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <ReadOnlyField label={data.firstNameLabel} value={firstName} />
                <ReadOnlyField label={data.lastNameLabel} value={lastName} />
              </div>

              <div className="mt-4">
                <ReadOnlyField label={data.emailLabel} value={email} />
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

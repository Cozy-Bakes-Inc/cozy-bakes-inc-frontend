"use client";

import { useAuthenticatedUser } from "@/hooks";
import { Shimmer } from "@/components/ui/shimmer";

function getInitials(firstName: string, lastName: string) {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.trim();
}

export default function ProfileSummaryCard() {
  const { data: authenticatedUser, isLoading } = useAuthenticatedUser(true);
  const user = authenticatedUser?.data?.user;
  const firstName = user?.first_name?.trim() ?? "";
  const lastName = user?.last_name?.trim() ?? "";
  const fullName = `${firstName} ${lastName}`.trim();
  const email = user?.email?.trim() ?? "";
  const initials = getInitials(firstName, lastName);

  return (
    <article className="rounded-2xl border border-border/24 bg-bg-creamy p-2">
      <div className="flex items-center gap-2 rounded-2xl border border-border/24 bg-bg-creamy p-2.5">
        {isLoading ? (
          <Shimmer className="size-14 shrink-0 rounded-2xl bg-gray/10 sm:size-16.75" />
        ) : (
          <div className="grid size-14 shrink-0 place-items-center rounded-2xl bg-background text-sm font-medium text-primary sm:size-16.75 sm:text-base">
            {initials}
          </div>
        )}
        <div className="min-w-0 space-y-1.5">
          {isLoading ? (
            <>
              <Shimmer className="h-6 w-32 rounded-md bg-gray/10" />
              <Shimmer className="h-4 w-44 rounded-md bg-gray/10" />
            </>
          ) : (
            <>
              <p className="truncate text-base font-semibold text-dark">
                {fullName}
              </p>
              <p className="truncate text-xs font-medium text-gray">{email}</p>
            </>
          )}
        </div>
      </div>
    </article>
  );
}

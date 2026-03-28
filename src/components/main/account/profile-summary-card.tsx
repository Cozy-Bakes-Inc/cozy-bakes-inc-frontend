"use client";

import { useAuthenticatedUser } from "@/hooks";
import type { AccountProfileUser } from "@/interfaces/main/account";

type ProfileSummaryCardProps = {
  profile: AccountProfileUser;
};

function getInitials(firstName: string, lastName: string, fallback: string) {
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.trim();
  return initials || fallback;
}

export default function ProfileSummaryCard({
  profile,
}: ProfileSummaryCardProps) {
  const { data: authenticatedUser } = useAuthenticatedUser(true);
  const user = authenticatedUser?.data?.user;
  const firstName = user?.first_name?.trim() || "";
  const lastName = user?.last_name?.trim() || "";
  const fullName = `${firstName} ${lastName}`.trim() || profile.name;
  const email = user?.email?.trim() || profile.email;
  const initials = getInitials(firstName, lastName, profile.initials);

  return (
    <article className="rounded-2xl border border-border/24 bg-bg-creamy p-2">
      <div className="flex items-center gap-2 rounded-2xl border border-border/24 bg-bg-creamy p-2.5">
        <div className="grid size-14 shrink-0 place-items-center rounded-2xl bg-background text-sm font-medium text-primary sm:size-16.75 sm:text-base">
          {initials}
        </div>
        <div className="min-w-0">
          <p className="truncate text-base font-semibold text-dark">
            {fullName}
          </p>
          <p className="truncate text-xs font-medium text-gray">
            {email}
          </p>
        </div>
      </div>
    </article>
  );
}

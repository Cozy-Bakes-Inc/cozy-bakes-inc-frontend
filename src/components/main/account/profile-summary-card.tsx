import type { AccountProfileUser } from "@/interfaces/main/account";

type ProfileSummaryCardProps = {
  profile: AccountProfileUser;
};

export default function ProfileSummaryCard({
  profile,
}: ProfileSummaryCardProps) {
  return (
    <article className="rounded-2xl border border-border/24 bg-bg-creamy p-2">
      <div className="flex items-center gap-2 rounded-2xl border border-border/24 bg-bg-creamy p-2.5">
        <div className="grid size-14 shrink-0 place-items-center rounded-2xl bg-background text-sm font-medium text-primary sm:size-16.75 sm:text-base">
          {profile.initials}
        </div>
        <div className="min-w-0">
          <p className="truncate text-base font-semibold text-dark">
            {profile.name}
          </p>
          <p className="truncate text-xs font-medium text-gray">
            {profile.email}
          </p>
        </div>
      </div>
    </article>
  );
}

import type { AccountProfileUser } from "@/interfaces/main/account";

type ProfileSummaryCardProps = {
  profile: AccountProfileUser;
};

export default function ProfileSummaryCard({ profile }: ProfileSummaryCardProps) {
  return (
    <article className="rounded-2xl border border-border/24 bg-bg-creamy p-2">
      <div className="flex items-center gap-2 rounded-2xl border border-border/24 bg-bg-creamy p-2.5">
        <div className="grid size-[67px] place-items-center rounded-2xl bg-background text-base font-medium text-primary">
          {profile.initials}
        </div>
        <div>
          <p className="text-base font-semibold text-dark">{profile.name}</p>
          <p className="text-xs font-medium text-[#667085]">{profile.email}</p>
        </div>
      </div>
    </article>
  );
}

import type { AccountInfoContent } from "@/interfaces/main/account";

type AccountInfoPanelProps = {
  content: AccountInfoContent;
};

export default function AccountInfoPanel({ content }: AccountInfoPanelProps) {
  return (
    <article className="mt-3 rounded-2xl border border-border/24 bg-bg-creamy p-4">
      <h3 className="text-base font-semibold text-dark sm:text-lg">
        {content.heading}
      </h3>
      <p className="mt-2 text-sm font-medium text-gray sm:text-base">
        {content.description}
      </p>
    </article>
  );
}

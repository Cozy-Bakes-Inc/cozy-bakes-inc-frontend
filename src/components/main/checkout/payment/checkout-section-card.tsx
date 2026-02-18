import { ReactNode } from "react";
import { cn } from "@/lib";

type CheckoutSectionCardProps = {
  title: string;
  headerAction?: ReactNode;
  children: ReactNode;
  className?: string;
};

export default function CheckoutSectionCard({
  title,
  headerAction,
  children,
  className,
}: CheckoutSectionCardProps) {
  return (
    <article
      className={cn(
        "rounded-2xl border border-border/24 bg-background p-4 sm:p-5",
        className,
      )}
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-base font-medium text-primary sm:text-lg">
          {title}
        </h2>
        {headerAction}
      </div>
      {children}
    </article>
  );
}

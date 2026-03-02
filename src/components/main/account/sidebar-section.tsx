import Link from "next/link";
import { cn } from "@/lib";
import { SidebarSectionProps } from "@/interfaces/main/account";

export default function SidebarSection({
  activeTab,
  sections,
}: SidebarSectionProps) {
  return (
    <div className="space-y-4">
      {sections.map((section) => (
        <article
          key={section.title}
          className="rounded-2xl border border-border/24 bg-background p-6"
        >
          <h2 className="text-lg font-semibold leading-7.5 text-dark">
            {section.title}
          </h2>

          <nav className="mt-2 space-y-3 py-4">
            {section.items.map((item) => {
              const isActive = item.id === activeTab;

              return (
                <Link
                  key={item.id}
                  href={`/account?tab=${item.id}`}
                  className={cn(
                    "flex h-12.25 items-center rounded-2xl px-4 text-base transition-colors",
                    isActive
                      ? "bg-bg-creamy font-semibold text-dark"
                      : "font-medium text-gray hover:bg-bg-creamy/70",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {section.withSignOut ? (
            <button
              type="button"
              className="h-13.5 w-full rounded-lg border border-[#f04438] bg-[#f04438] px-4 text-base font-medium text-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]"
            >
              Sign Out
            </button>
          ) : null}
        </article>
      ))}
    </div>
  );
}

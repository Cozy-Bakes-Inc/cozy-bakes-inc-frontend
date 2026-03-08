"use client";
import Link from "next/link";
import { cn, removeToken } from "@/lib";
import { SidebarSectionProps } from "@/interfaces/main/account";
import { Button } from "@/components/ui/button";
import { logoutAPI } from "@/services/mutations";
import { useQueryClient } from "@tanstack/react-query";

export default function SidebarSection({
  activeTab,
  sections,
}: SidebarSectionProps) {
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    await logoutAPI();
    await removeToken();
    queryClient.removeQueries({ queryKey: ["authenticatedUser"] });
    window.location.assign("/login");
  };
  return (
    <div className="space-y-4">
      {sections.map((section) => (
        <article
          key={section.title}
          className="rounded-2xl border border-border/24 bg-background p-4 sm:p-6"
        >
          <h2 className="text-base font-semibold leading-7 text-dark sm:text-lg sm:leading-7.5">
            {section.title}
          </h2>

          <nav className="mt-2 space-y-2 py-3 sm:space-y-3 sm:py-4">
            {section.items.map((item) => {
              const isActive = item.id === activeTab;

              return (
                <Link
                  key={item.id}
                  href={`/account?tab=${item.id}`}
                  className={cn(
                    "flex h-11 items-center rounded-2xl px-4 text-sm transition-colors sm:h-12.25 sm:text-base",
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
            <Button
              onClick={handleLogout}
              type="button"
              size="default"
              className="h-12 w-full rounded-lg border border-[#f04438] bg-[#f04438] px-4 text-sm font-medium text-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] hover:bg-[#f04438]/90 sm:h-13.5 sm:text-base"
            >
              Sign Out
            </Button>
          ) : null}
        </article>
      ))}
    </div>
  );
}

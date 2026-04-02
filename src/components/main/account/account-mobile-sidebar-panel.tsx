"use client";

import { useMemo, useState } from "react";
import { Menu } from "lucide-react";
import { useMediaQuery } from "usehooks-ts";
import { Button } from "@/components/ui/button";
import Panel from "@/components/ui/panel";
import type { SidebarSectionProps } from "@/interfaces/main/account";
import SidebarSection from "./sidebar-section";

export default function AccountMobileSidebarPanel({
  activeTab,
  sections,
}: Omit<SidebarSectionProps, "onNavigate">) {
  const [isOpen, setIsOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const activeLabel = useMemo(
    () =>
      sections
        .flatMap((section) => section.items)
        .find((item) => item.id === activeTab)?.label ?? "Account Menu",
    [activeTab, sections],
  );

  if (isDesktop) {
    return null;
  }

  return (
    <div className="lg:hidden">
      <Button
        type="button"
        variant="outline"
        className="h-11 w-full justify-between rounded-2xl border-primary/20 bg-background px-4 text-sm font-semibold text-dark shadow-none hover:bg-bg-creamy hover:text-dark"
        onClick={() => setIsOpen(true)}
      >
        <span className="flex items-center gap-2">
          <Menu className="size-4 text-primary" />
          Menu
        </span>
        <span className="truncate text-xs font-medium text-gray">
          {activeLabel}
        </span>
      </Button>

      <Panel
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title="Account Menu"
        contentClassName="w-[380px] max-w-[92vw] gap-0 rounded-r-[28px] rounded-l-none border-r-0 bg-bg-creamy p-0"
        titleClassName="text-lg text-dark"
        closeButtonClassName="right-5 top-5 border-primary text-primary"
      >
        <div className="min-h-0 flex-1 p-4 pt-0">
          <div className="h-full overflow-y-auto">
            <SidebarSection
              activeTab={activeTab}
              sections={sections}
              onNavigate={() => setIsOpen(false)}
            />
          </div>
        </div>
      </Panel>
    </div>
  );
}

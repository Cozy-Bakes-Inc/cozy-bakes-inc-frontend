import {
  accountPanelContent,
  accountTabs,
  allTabs,
  orderTabs,
  profileUser,
} from "@/data/main/account";
import { AccountProps } from "@/interfaces/main/account";
import { normalizeAccountTab } from "@/lib/main/account";
import { AccountInfoTab } from "@/types/main/account";
import AccountInfoPanel from "./account-info-panel";
import AccountOrdersPanel from "./account-orders-panel";
import ProfileSummaryCard from "./profile-summary-card";
import SidebarSection from "./sidebar-section";

export { normalizeAccountTab };

export default function Account({ activeTab }: AccountProps) {
  const activeTabDefinition =
    allTabs.find((tab) => tab.id === activeTab) ?? allTabs[0];
  const isOrderTab = orderTabs.some((tab) => tab.id === activeTab);

  return (
    <section className="bg-background py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-5 sm:px-10">
        <div className="grid gap-6 lg:grid-cols-[311px_1fr] lg:items-start">
          <div className="space-y-4 lg:sticky lg:top-24">
            <ProfileSummaryCard profile={profileUser} />

            <SidebarSection
              activeTab={activeTab}
              sections={[
                {
                  title: "My Orders Details",
                  items: orderTabs,
                },
                {
                  title: "My Account",
                  items: accountTabs,
                  withSignOut: true,
                },
              ]}
            />
          </div>

          <section className="rounded-3xl bg-bg-creamy p-3 sm:p-6">
            <div className="rounded-3xl border border-border/24 bg-background p-4 sm:p-6">
              <h2 className="text-lg font-medium capitalize leading-7.5 text-primary">
                {activeTabDefinition.title}
              </h2>

              {isOrderTab ? (
                <AccountOrdersPanel />
              ) : (
                <AccountInfoPanel
                  content={accountPanelContent[activeTab as AccountInfoTab]}
                />
              )}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}

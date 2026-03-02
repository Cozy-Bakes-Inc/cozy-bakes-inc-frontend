import {
  accountPanelContent,
  accountTabs,
  allTabs,
  orderDetailsById,
  orderTabs,
  profileUser,
} from "@/data/main/account";
import type { AccountProps } from "@/interfaces/main/account";
import {
  normalizeAccountOrderId,
  normalizeAccountTab,
} from "@/lib/main/account";
import type { AccountInfoTab, AccountOrderTab } from "@/types/main/account";
import AccountBreadcrumb from "./account-breadcrumb";
import AccountInfoPanel from "./account-info-panel";
import AccountOrderDetailsPanel from "./account-order-details-panel";
import AccountOrdersPanel from "./account-orders-panel";
import ProfileSummaryCard from "./profile-summary-card";
import SidebarSection from "./sidebar-section";

export { normalizeAccountOrderId, normalizeAccountTab };

export default function Account({ activeTab, activeOrderId }: AccountProps) {
  const activeTabDefinition =
    allTabs.find((tab) => tab.id === activeTab) ?? allTabs[0];
  const isOrderTab = orderTabs.some((tab) => tab.id === activeTab);
  const activeOrderTab = activeTab as AccountOrderTab;
  const selectedOrderDetails = activeOrderId
    ? orderDetailsById[activeOrderId]
    : undefined;

  return (
    <>
      <AccountBreadcrumb activeTab={activeTab} />
      <section className="bg-background py-6 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-10">
          <div className="grid gap-4 sm:gap-6 lg:grid-cols-[311px_1fr] lg:items-start">
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

            <section className="rounded-3xl bg-bg-creamy p-2.5 sm:p-6">
              <div className="rounded-3xl border border-border/24 bg-background p-4 sm:p-6">
                <h2 className="text-base font-medium capitalize leading-7 text-primary sm:text-lg sm:leading-7.5">
                  {activeTabDefinition.title}
                </h2>

                {isOrderTab ? (
                  selectedOrderDetails ? (
                    <AccountOrderDetailsPanel details={selectedOrderDetails} />
                  ) : (
                    <AccountOrdersPanel activeTab={activeOrderTab} />
                  )
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
    </>
  );
}

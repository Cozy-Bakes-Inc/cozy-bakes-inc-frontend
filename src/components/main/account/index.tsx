import {
  accountPanelContent,
  accountTabs,
  allTabs,
  editEmailData,
  editPasswordData,
  editPersonalInformationData,
  orderDetailsByTab,
  orderTabs,
  personalInformationData,
  profileUser,
  shippingInformationData,
} from "@/data/main/account";
import type { AccountProps } from "@/interfaces/main/account";
import {
  normalizeAccountOrderId,
  normalizeAccountTab,
} from "@/lib/main/account";
import type { AccountInfoTab, AccountOrderListTab } from "@/types/main/account";
import AccountBreadcrumb from "./account-breadcrumb";
import AccountCancelOrderPanel from "./account-cancel-order-panel";
import AccountEditEmailPanel from "./account-edit-email-panel";
import AccountEditPasswordPanel from "./edit-password";
import AccountCompleteOrderPanel from "./account-complete-order-panel";
import AccountEditPersonalInformationPanel from "./account-edit-personal-information-panel";
import AccountInfoPanel from "./account-info-panel";
import AccountNewOrderPanel from "./account-new-order-panel";
import AccountOrderDetailsPanel from "./account-order-details-panel";
import AccountPersonalInformationPanel from "./account-personal-information-panel";
import AccountShippingInformationPanel from "./account-shipping-information-panel";
import ProfileSummaryCard from "./profile-summary-card";
import SidebarSection from "./sidebar-section";

export { normalizeAccountOrderId, normalizeAccountTab };

export default function Account({ activeTab, activeOrderId }: AccountProps) {
  const activeTabDefinition =
    allTabs.find((tab) => tab.id === activeTab) ?? allTabs[0];

  const activeOrderListTab =
    activeTab === "new-order" ||
    activeTab === "cancel-order" ||
    activeTab === "complete-order"
      ? (activeTab as AccountOrderListTab)
      : null;

  const isPersonalInformationTab = activeTab === "personal-information";
  const isEditPersonalInformationTab =
    activeTab === "edit-personal-information";
  const isEditEmailTab = activeTab === "edit-email";
  const isEditPasswordTab = activeTab === "edit-password";
  const isShippingInformationTab = activeTab === "shipping-information";
  const selectedOrderDetails =
    activeOrderListTab && activeOrderId
      ? orderDetailsByTab[activeOrderListTab][activeOrderId]
      : undefined;

  function renderOrderListByTab(tab: AccountOrderListTab) {
    switch (tab) {
      case "new-order":
        return <AccountNewOrderPanel />;
      case "cancel-order":
        return <AccountCancelOrderPanel />;
      case "complete-order":
        return <AccountCompleteOrderPanel />;
      default:
        return null;
    }
  }

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

            {activeOrderListTab ? (
              <section className="rounded-3xl bg-bg-creamy p-2.5 sm:p-6 bg">
                <div className="rounded-3xl border border-border/24 bg-background p-4 sm:p-6">
                  <h2 className="text-base font-medium capitalize leading-7 text-primary sm:text-lg sm:leading-7.5">
                    {activeTabDefinition.title}
                  </h2>

                  {selectedOrderDetails ? (
                    <AccountOrderDetailsPanel details={selectedOrderDetails} />
                  ) : (
                    renderOrderListByTab(activeOrderListTab)
                  )}
                </div>
              </section>
            ) : isShippingInformationTab ? (
              <AccountShippingInformationPanel data={shippingInformationData} />
            ) : isPersonalInformationTab ? (
              <AccountPersonalInformationPanel data={personalInformationData} />
            ) : isEditPersonalInformationTab ? (
              <AccountEditPersonalInformationPanel
                data={editPersonalInformationData}
              />
            ) : isEditEmailTab ? (
              <AccountEditEmailPanel data={editEmailData} />
            ) : isEditPasswordTab ? (
              <AccountEditPasswordPanel data={editPasswordData} />
            ) : (
              <AccountInfoPanel
                content={accountPanelContent[activeTab as AccountInfoTab]}
              />
            )}
          </div>
        </div>
      </section>
    </>
  );
}

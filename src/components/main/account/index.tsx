import {
  accountPanelContent,
  accountTabs,
  allTabs,
  editEmailData,
  editPasswordData,
  editPersonalInformationData,
  orderTabs,
  personalInformationData,
  profileUser,
  shippingInformationData,
} from "@/data/main/account";
import type { AccountProps } from "@/interfaces/main/account";
import {
  normalizeAccountOrderNumber,
  normalizeAccountTab,
} from "@/lib/main/account";
import type { AccountInfoTab, AccountOrderListTab } from "@/types/main/account";
import AccountBreadcrumb from "./account-breadcrumb";
import AccountCancelOrderPanel from "./account-cancel-order-panel";
import AccountEditEmailPanel from "./account-edit-email-panel";
import AccountEditPasswordPanel from "./edit-password";
import AccountCompleteOrderPanel from "./account-complete-order-panel";
import AccountInfoPanel from "./account-info-panel";
import AccountNewOrderPanel from "./account-new-order-panel";
import AccountOrderDetailsPanel from "./account-order-details-panel";
import AccountPersonalInformationPanel from "./account-personal-information-panel";
import AccountShippingInformationPanel from "./account-shipping-information-panel";
import ProfileSummaryCard from "./profile-summary-card";
import SidebarSection from "./sidebar-section";
import AccountEditPersonalInformationPanel from "./edit-personal-information/account-edit-personal-information-panel";
import AccountMobileSidebarPanel from "./account-mobile-sidebar-panel";

export { normalizeAccountOrderNumber, normalizeAccountTab };

export default function Account({
  activeTab,
  activeOrderNumber,
}: AccountProps) {
  const sidebarSections = [
    {
      title: "My Orders Details",
      items: orderTabs,
    },
    {
      title: "My Account",
      items: accountTabs,
      withSignOut: true,
    },
  ] as const;

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
      <section className="w-full overflow-x-hidden bg-background py-6 sm:py-14">
        <div className="mx-auto w-full max-w-7xl px-3 sm:px-10">
          <div className="grid w-full min-w-0 gap-4 sm:gap-6 lg:grid-cols-[minmax(0,311px)_minmax(0,1fr)] lg:items-start">
            <div className="min-w-0 space-y-4 lg:sticky lg:top-24">
              <ProfileSummaryCard profile={profileUser} />

              <AccountMobileSidebarPanel
                activeTab={activeTab}
                sections={sidebarSections}
              />

              <div className="hidden lg:block">
                <SidebarSection
                  activeTab={activeTab}
                  sections={sidebarSections}
                />
              </div>
            </div>

            {activeOrderListTab ? (
              <section className="min-w-0 rounded-3xl bg-bg-creamy p-2.5 sm:p-6">
                <div className="min-w-0 rounded-3xl border border-border/24 bg-background p-3 sm:p-6">
                  <h2 className="text-base font-medium capitalize leading-7 text-primary sm:text-lg sm:leading-7.5">
                    {activeTabDefinition.title}
                  </h2>

                  {activeOrderNumber ? (
                    <AccountOrderDetailsPanel orderNumber={activeOrderNumber} />
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

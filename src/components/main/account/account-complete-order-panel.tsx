import AccountOrdersListPanel from "./account-orders-list-panel";

export default function AccountCompleteOrderPanel() {
  return (
    <AccountOrdersListPanel
      activeTab="complete-order"
      queryStatus="completed"
      visibleStatuses={["completed"]}
      emptyMessage="No completed orders found."
    />
  );
}

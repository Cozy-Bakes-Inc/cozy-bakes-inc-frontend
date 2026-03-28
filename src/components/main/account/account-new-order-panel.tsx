import AccountOrdersListPanel from "./account-orders-list-panel";

export default function AccountNewOrderPanel() {
  return (
    <AccountOrdersListPanel
      activeTab="new-order"
      queryStatus="pending"
      visibleStatuses={["pending"]}
      emptyMessage="No active orders found."
    />
  );
}

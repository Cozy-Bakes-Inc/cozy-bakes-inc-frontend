import AccountOrdersListPanel from "./account-orders-list-panel";

export default function AccountCancelOrderPanel() {
  return (
    <AccountOrdersListPanel
      activeTab="cancel-order"
      queryStatus="cancelled"
      visibleStatuses={["cancelled"]}
      emptyMessage="No cancelled orders found."
    />
  );
}

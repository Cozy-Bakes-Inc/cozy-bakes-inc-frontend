import { ordersByTab } from "@/data/main/account";
import AccountOrdersCard from "./account-orders-card";

export default function AccountCancelOrderPanel() {
  const list = ordersByTab["cancel-order"];

  return (
    <div className="mt-3 space-y-3">
      {list.map((order) => (
        <AccountOrdersCard
          key={order.id}
          activeTab="cancel-order"
          order={order}
        />
      ))}
    </div>
  );
}

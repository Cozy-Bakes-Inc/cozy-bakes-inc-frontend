import { ordersByTab } from "@/data/main/account";
import AccountOrdersCard from "./account-orders-card";

export default function AccountCompleteOrderPanel() {
  const list = ordersByTab["complete-order"];

  return (
    <div className="mt-3 space-y-3">
      {list.map((order) => (
        <AccountOrdersCard
          key={order.id}
          activeTab="complete-order"
          order={order}
        />
      ))}
    </div>
  );
}

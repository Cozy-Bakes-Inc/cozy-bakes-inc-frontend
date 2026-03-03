import { ordersByTab } from "@/data/main/account";
import AccountOrdersCard from "./account-orders-card";

export default function AccountNewOrderPanel() {
  const list = ordersByTab["new-order"];

  return (
    <div className="mt-3 space-y-3">
      {list.map((order) => (
        <AccountOrdersCard key={order.id} activeTab="new-order" order={order} />
      ))}
    </div>
  );
}

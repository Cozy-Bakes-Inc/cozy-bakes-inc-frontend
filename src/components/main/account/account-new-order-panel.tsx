"use client";

import { useState } from "react";
import type { OrderStatus } from "@/types";
import { cn } from "@/lib";
import AccountOrdersListPanel from "./account-orders-list-panel";

const newOrderStatusTabs: Array<{
  id: OrderStatus;
  label: string;
  emptyMessage: string;
}> = [
  {
    id: "pending",
    label: "Pending",
    emptyMessage: "No pending orders found.",
  },
  {
    id: "processed",
    label: "Processed",
    emptyMessage: "No processed orders found.",
  },
  {
    id: "packed",
    label: "Packed",
    emptyMessage: "No packed orders found.",
  },
  {
    id: "shipped",
    label: "Shipped",
    emptyMessage: "No shipped orders found.",
  },
];

export default function AccountNewOrderPanel() {
  const [activeStatus, setActiveStatus] = useState<OrderStatus>("pending");

  const currentTab =
    newOrderStatusTabs.find((tab) => tab.id === activeStatus) ??
    newOrderStatusTabs[0];

  return (
    <div className="mt-4 space-y-4">
      <div className="overflow-x-auto">
        <div className="flex min-w-max gap-2 rounded-2xl border border-border/24 bg-bg-creamy p-1.5">
          {newOrderStatusTabs.map((tab) => {
            const isActive = tab.id === activeStatus;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveStatus(tab.id)}
                className={cn(
                  "rounded-xl px-4 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-white shadow-sm"
                    : "text-gray hover:bg-white hover:text-primary",
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <AccountOrdersListPanel
        activeTab="new-order"
        queryStatus={activeStatus}
        visibleStatuses={[activeStatus]}
        emptyMessage={currentTab.emptyMessage}
      />
    </div>
  );
}

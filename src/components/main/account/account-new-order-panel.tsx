"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { accountStatusTabsBreakpoints } from "@/data";
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
    <div className="mt-4 min-w-0 space-y-4">
      <div className="max-w-full overflow-hidden rounded-2xl border border-border/24 bg-bg-creamy p-1.5">
        <Swiper
          slidesPerView={2}
          spaceBetween={8}
          breakpoints={accountStatusTabsBreakpoints}
        >
          {newOrderStatusTabs.map((tab) => {
            const isActive = tab.id === activeStatus;

            return (
              <SwiperSlide key={tab.id}>
                <button
                  type="button"
                  onClick={() => setActiveStatus(tab.id)}
                  className={cn(
                    "h-10 w-full rounded-xl px-3 text-xs font-medium transition-colors sm:px-4 sm:text-sm",
                    isActive
                      ? "bg-primary text-white shadow-sm"
                      : "text-gray hover:bg-white hover:text-primary",
                  )}
                >
                  {tab.label}
                </button>
              </SwiperSlide>
            );
          })}
        </Swiper>
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

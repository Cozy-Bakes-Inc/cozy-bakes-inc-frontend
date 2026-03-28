"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ClipboardX, PackageCheck, ReceiptText } from "lucide-react";
import { useOrders } from "@/hooks";
import type { OrderListItem } from "@/interfaces";
import { cn } from "@/lib";
import type { AccountOrderListTab, OrderStatus } from "@/types";
import { Button } from "@/components/ui/button";
import { AccountOrderCardSkeleton } from "./account-order-skeletons";

const FALLBACK_ORDER_IMAGE = "/images/artisan-sourdough.jpg";

const statusLabelMap: Record<OrderStatus, string> = {
  pending: "Pending",
  processed: "Processed",
  packed: "Packed",
  shipped: "Shipped",
  completed: "Completed",
  cancelled: "Cancelled",
};

const statusClassNameMap: Record<OrderStatus, string> = {
  pending: "border-[#fdb022]/30 bg-[#fffaeb] text-[#b54708]",
  processed: "border-[#53b1fd]/30 bg-[#eff8ff] text-[#175cd3]",
  packed: "border-[#7a5af8]/30 bg-[#f4f3ff] text-[#5925dc]",
  shipped: "border-[#36bffa]/30 bg-[#ecfdff] text-[#0e7090]",
  completed: "border-[#75e0a7]/30 bg-[#ecfdf3] text-[#027a48]",
  cancelled: "border-[#fda29b]/30 bg-[#fef3f2] text-[#b42318]",
};

type AccountOrdersListPanelProps = {
  activeTab: AccountOrderListTab;
  visibleStatuses: OrderStatus[];
  queryStatus: OrderStatus;
  emptyMessage?: string;
};

const emptyStateConfig = {
  "new-order": {
    title: "No active orders yet",
    description:
      "Your recent orders will appear here once they are placed and start processing.",
    icon: ReceiptText,
    accentClassName: "bg-[#fffaeb] text-[#b54708]",
  },
  "cancel-order": {
    title: "No cancelled orders",
    description:
      "Cancelled orders will be listed here whenever an order is cancelled.",
    icon: ClipboardX,
    accentClassName: "bg-[#fef3f2] text-[#b42318]",
  },
  "complete-order": {
    title: "No completed orders",
    description:
      "Completed orders will show up here after they have been fully delivered.",
    icon: PackageCheck,
    accentClassName: "bg-[#ecfdf3] text-[#027a48]",
  },
} as const;

function formatPrice(value: string) {
  return `$${value}`;
}

function getOrderItemsSummary(order: OrderListItem) {
  return order.items
    .map((item) => `${item.title} * ${item.quantity}`)
    .join(" , ");
}

function getOrderItemsDescription(order: OrderListItem) {
  return order.items
    .map((item) => item.description?.trim())
    .filter((description): description is string => Boolean(description))
    .join(" , ");
}

function getOrderImage(order: OrderListItem) {
  const firstImage = order.items.flatMap((item) => item.images)[0];
  return firstImage?.url || firstImage?.image || FALLBACK_ORDER_IMAGE;
}

export default function AccountOrdersListPanel({
  activeTab,
  visibleStatuses,
  queryStatus,
  emptyMessage = "No orders found for this section.",
}: AccountOrdersListPanelProps) {
  const {
    data: ordersData,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useOrders(queryStatus);

  const orders = useMemo(
    () =>
      ordersData?.pages
        ?.flatMap((page) => page?.data?.data ?? [])
        ?.filter((order) => visibleStatuses.includes(order.status)) ?? [],
    [ordersData, visibleStatuses],
  );
  const emptyState = emptyStateConfig[activeTab];
  const EmptyStateIcon = emptyState.icon;

  return (
    <div className="mt-3 space-y-3">
      {isLoading ? (
        Array.from({ length: 3 }).map((_, index) => (
          <AccountOrderCardSkeleton key={index} />
        ))
      ) : orders.length ? (
        orders.map((order) => {
          const description = getOrderItemsDescription(order);

          return (
            <article
              key={order.id}
              className="rounded-2xl border border-border/24 bg-bg-creamy p-2.5"
            >
              <div className="flex items-start gap-2">
                <Image
                  src={getOrderImage(order)}
                  alt={order.order_number}
                  width={71}
                  height={71}
                  className="size-17.75 shrink-0 rounded-lg object-cover"
                />
                <div className="min-w-0 flex-1">
                  <div className="mb-0.5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-lg font-semibold leading-7 text-dark sm:text-[18px]">
                      Order #{order.order_number}
                    </p>
                    <span
                      className={cn(
                        "inline-flex w-fit items-center rounded-full border px-3 py-1 text-xs font-semibold",
                        statusClassNameMap[order.status],
                      )}
                    >
                      {statusLabelMap[order.status]}
                    </span>
                  </div>

                  <p className="text-sm font-medium text-gray sm:max-w-3xl">
                    {getOrderItemsSummary(order)}
                  </p>

                  {description ? (
                    <p className="mt-1 text-sm text-gray/90 sm:max-w-3xl">
                      {description}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.6px] text-warm-brown">
                    Total
                  </p>
                  <p className="text-[20px] font-semibold leading-7.5 text-primary">
                    {formatPrice(order.total_amount)}
                  </p>
                </div>

                <Link
                  href={`/account?tab=${activeTab}&orderNumber=${order.order_number}`}
                  className="flex h-10 w-full shrink-0 items-center justify-center rounded-full bg-primary px-4 text-sm font-medium text-white sm:w-auto"
                >
                  View Order Details
                </Link>
              </div>
            </article>
          );
        })
      ) : (
        <div className="overflow-hidden rounded-3xl border border-border/24 bg-[#fffdf8] shadow-[0px_12px_30px_rgba(16,24,40,0.04)]">
          <div className="h-2 w-full bg-gradient-to-r from-primary/85 via-[#f6d88f] to-transparent" />
          <div className="flex flex-col items-center px-6 py-10 text-center sm:px-10 sm:py-12">
            <div
              className={cn(
                "grid size-16 place-items-center rounded-2xl shadow-[0px_10px_24px_rgba(16,24,40,0.06)]",
                emptyState.accentClassName,
              )}
            >
              <EmptyStateIcon className="size-8" strokeWidth={1.8} />
            </div>
            <h3 className="mt-5 text-xl font-semibold text-dark">
              {emptyState.title}
            </h3>
            <p className="mt-2 max-w-md text-sm leading-6 text-gray">
              {emptyMessage === "No orders found for this section."
                ? emptyState.description
                : emptyMessage}
            </p>
          </div>
        </div>
      )}

      {hasNextPage ? (
        <div className="flex justify-center pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="h-11 rounded-full border-primary/20 px-6 text-sm font-medium text-primary hover:bg-primary/5"
          >
            {isFetchingNextPage ? "Loading..." : "Load More Orders"}
          </Button>
        </div>
      ) : null}
    </div>
  );
}

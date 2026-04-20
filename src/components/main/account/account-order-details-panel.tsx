"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import {
  CircleAlert,
  Check,
  ClipboardCheck,
  Layers,
  Package,
  ReceiptText,
  Truck,
} from "lucide-react";
import { useSingleOrder } from "@/hooks";
import type { OrderListItem, OrderListItemDetails } from "@/interfaces";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import toast from "react-hot-toast";
import { OrderStatus } from "@/types";
import { cancelOrderAPI } from "@/services/mutations/account/orders";
import { AccountOrderDetailsSkeleton } from "./account-order-skeletons";

const FALLBACK_ORDER_IMAGE = "/images/artisan-sourdough.jpg";

type AccountOrderDetailsPanelProps = {
  orderNumber: string;
};

function formatDateTime(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function formatPrice(value: string | number | null | undefined) {
  const numericValue = Number(value ?? 0);
  return `$${numericValue.toFixed(2)}`;
}

function formatPaymentMethod(method: string) {
  return method
    .split(/[_-\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function getItemImage(item: OrderListItemDetails) {
  const firstImage = item.images[0];
  if (typeof firstImage === "string") {
    return firstImage;
  }

  return firstImage?.url || firstImage?.image || FALLBACK_ORDER_IMAGE;
}

function getItemHref(item: OrderListItemDetails) {
  return item.slug ? `/products/${item.slug}` : null;
}

function getItemTotal(item: OrderListItemDetails) {
  if (item.subtotal) {
    return formatPrice(item.subtotal);
  }

  return formatPrice(Number(item.price) * Number(item.quantity));
}

function buildTimeline(order: OrderListItem) {
  const statuses: OrderStatus[] = [
    "pending",
    "processed",
    "packed",
    "shipped",
    "completed",
  ];
  const currentStatusIndex = statuses.indexOf(order.status);
  const createdAt = formatDateTime(order.created_at);
  const updatedAt = formatDateTime(order.updated_at);

  return [
    {
      id: "placed",
      title: "Order Placed",
      time: createdAt,
      isCompleted: true,
    },
    {
      id: "processed",
      title: order.status === "cancelled" ? "Processing" : "Processed",
      time:
        currentStatusIndex >= 1 || order.status === "cancelled"
          ? updatedAt
          : "",
      isCompleted: currentStatusIndex >= 1 || order.status === "cancelled",
    },
    {
      id: "packed",
      title: "Packed",
      time: currentStatusIndex >= 2 ? updatedAt : "",
      isCompleted: currentStatusIndex >= 2,
    },
    {
      id: "shipped",
      title: order.status === "cancelled" ? "Cancelled" : "Shipped",
      time:
        currentStatusIndex >= 3 || order.status === "cancelled"
          ? updatedAt
          : "",
      isCompleted: currentStatusIndex >= 3 || order.status === "cancelled",
    },
    {
      id: "delivered",
      title: order.status === "completed" ? "Delivered" : "Completed",
      time: currentStatusIndex >= 4 ? updatedAt : "",
      isCompleted: currentStatusIndex >= 4,
    },
  ];
}

export default function AccountOrderDetailsPanel({
  orderNumber,
}: AccountOrderDetailsPanelProps) {
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const [isCancelling, setIsCancelling] = useState(false);
  const { data, isLoading, error, isError } = useSingleOrder(orderNumber);
  const order = data?.data;
  const timeline = order ? buildTimeline(order) : [];
  const completedStepsCount = timeline.filter(
    (step) => step.isCompleted,
  ).length;
  const completedSegmentsRatio =
    timeline.length > 1
      ? Math.max(completedStepsCount - 1, 0) / (timeline.length - 1)
      : 0;

  const iconByStepId = {
    placed: Layers,
    processed: ClipboardCheck,
    packed: Package,
    shipped: Truck,
    delivered: Check,
  } as const;

  if (isLoading) {
    return <AccountOrderDetailsSkeleton />;
  }

  const errorStatus = (error as { response?: { status?: number } })?.response
    ?.status;
  const activeTab = searchParams.get("tab") || "new-order";

  if (isError && errorStatus === 404) {
    return (
      <div className="mt-4 rounded-3xl border border-dashed border-[#f04438]/25 bg-[#fef3f2] p-6 text-center sm:p-10">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-white text-[#f04438] shadow-sm">
          <CircleAlert className="size-7" strokeWidth={2.2} />
        </div>
        <h3 className="mt-4 text-xl font-semibold text-dark">
          Order not found
        </h3>
        <p className="mx-auto mt-2 max-w-md text-sm font-medium text-gray">
          The order number <span className="font-semibold">{orderNumber}</span>{" "}
          was not found.
        </p>
        <Link
          href={`/account?tab=${activeTab}`}
          className="mt-5 inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-white hover:bg-primary/90"
        >
          Back to Orders
        </Link>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="mt-4 rounded-2xl border border-dashed border-border/40 bg-bg-creamy px-4 py-8 text-center text-sm font-medium text-gray">
        Order details could not be loaded. Please try again.
      </div>
    );
  }

  const safeOrderNumber = order.order_number?.trim();
  const canCancelOrder =
    Boolean(safeOrderNumber) && order.status === "pending";

  const handleCancelOrder = async () => {
    if (!canCancelOrder || isCancelling) {
      return;
    }

    setIsCancelling(true);

    try {
      if (!safeOrderNumber) {
        toast.error("Order number is missing");
        return;
      }

      const result = await cancelOrderAPI(safeOrderNumber);

      if (result?.ok) {
        toast.success(result?.message || "Order cancelled successfully");
        await queryClient.invalidateQueries({
          queryKey: ["singleOrder", safeOrderNumber],
        });
        await queryClient.invalidateQueries({
          queryKey: ["orders"],
        });
        return;
      }

      toast.error(result?.message || "Failed to cancel order");
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <div className="mt-4 space-y-5">
      <section className="overflow-x-auto pb-2">
        <div className="relative mx-auto grid min-w-190 grid-cols-5 gap-4">
          <span className="absolute left-[10%] right-[10%] top-5 h-0.5 bg-[#d0d5dd]" />
          <span
            className="absolute left-[10%] top-5 h-0.5 bg-[#3fbf5a] transition-all"
            style={{ width: `${completedSegmentsRatio * 80}%` }}
          />

          {timeline.map((step) => (
            <div
              key={step.id}
              className="relative z-10 flex flex-col items-center text-center"
            >
              {step.id === "delivered" && step.isCompleted ? (
                <div className="relative grid size-10 shrink-0 place-items-center rounded-full bg-[#f2f4f7] shadow-[0px_4px_10px_rgba(16,24,40,0.12)]">
                  <span className="absolute inset-0 rounded-full border border-[#eaecf0]" />
                  <span
                    className="absolute inset-0 rounded-full border-4 border-transparent border-r-[#3fbf5a] border-b-[#3fbf5a]"
                    style={{ transform: "rotate(16deg)" }}
                  />
                  <span className="grid size-6 shrink-0 place-items-center rounded-full border-2 border-[#1d3ea8] bg-white text-[#1d3ea8]">
                    <Check className="size-4 shrink-0" strokeWidth={2.4} />
                  </span>
                </div>
              ) : (
                <div
                  className={`relative grid size-10 shrink-0 place-items-center rounded-full border-2 bg-white ${
                    step.isCompleted
                      ? "border-[#3fbf5a] text-[#3fbf5a]"
                      : "border-[#d0d5dd] text-[#98a2b3]"
                  }`}
                >
                  {(() => {
                    const Icon =
                      iconByStepId[step.id as keyof typeof iconByStepId] ??
                      Layers;
                    return <Icon className="size-5 shrink-0" strokeWidth={2} />;
                  })()}
                </div>
              )}

              <p
                className={`mt-3 text-sm font-medium ${
                  step.isCompleted ? "text-dark" : "text-[#98a2b3]"
                }`}
              >
                {step.title}
              </p>
              {step.time ? (
                <p
                  className={`mt-1 whitespace-nowrap text-xs ${
                    step.isCompleted ? "text-gray" : "text-[#98a2b3]"
                  }`}
                >
                  {step.time}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl bg-bg-creamy p-4 sm:p-6">
        <h3 className="text-lg font-medium leading-7 text-primary sm:text-xl sm:leading-7.5">
          Order Details
        </h3>

        <div className="mt-4 space-y-3">
          {order.items.map((item) => {
            const itemHref = getItemHref(item);
            const itemImage = getItemImage(item);

            return (
              <article
                key={`${item.product_id}-${item.title}`}
                className="rounded-2xl border border-border/24 bg-bg-creamy p-2.5"
              >
                <div className="flex items-start gap-2">
                  {itemHref ? (
                    <Link
                      href={itemHref}
                      className="block shrink-0 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
                      <Image
                        src={itemImage}
                        alt={item.title}
                        width={71}
                        height={71}
                        className="size-17.75 rounded-lg object-cover"
                      />
                    </Link>
                  ) : (
                    <Image
                      src={itemImage}
                      alt={item.title}
                      width={71}
                      height={71}
                      className="size-17.75 shrink-0 rounded-lg object-cover"
                    />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="mb-0.5 text-sm font-medium text-gray">
                      Order #{order.order_number}
                    </p>
                    {itemHref ? (
                      <Link
                        href={itemHref}
                        className="text-lg font-semibold leading-7 text-dark hover:text-primary sm:text-[18px]"
                      >
                        {item.title}
                      </Link>
                    ) : (
                      <p className="text-lg font-semibold leading-7 text-dark sm:text-[18px]">
                        {item.title}
                      </p>
                    )}
                    {item.description ? (
                      <p className="text-sm font-medium text-gray sm:max-w-3xl">
                        {item.description}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
                  <div>
                    <p className="mb-0.5 text-xs font-medium uppercase tracking-[0.6px] text-warm-brown">
                      Total Price
                    </p>
                    <p className="text-xl font-semibold leading-7 text-primary sm:text-[24px] sm:leading-7">
                      {getItemTotal(item)}
                    </p>
                  </div>

                  <span className="w-full shrink-0 rounded-lg bg-background px-4 py-2 text-center text-sm text-chocolate sm:w-auto sm:text-base">
                    {item.title} * {item.quantity}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="rounded-3xl bg-bg-creamy p-4 sm:p-6">
        <div className="flex items-center gap-2 text-primary">
          <ReceiptText className="size-5 shrink-0" />
          <h3 className="text-xl font-medium leading-7 sm:text-[24px]">
            Order Summary
          </h3>
        </div>

        <div className="mt-4 rounded-3xl bg-background px-4 sm:px-8">
          {order.items.map((item) => (
            <div
              key={`${item.product_id}-${item.title}-summary`}
              className="flex min-h-12 items-center justify-between gap-3 border-b border-border/24 py-2"
            >
              <span className="min-w-0 text-sm font-medium text-gray sm:text-base">
                {item.title} * {item.quantity}
              </span>
              <span className="shrink-0 text-base font-semibold text-dark sm:text-[18px]">
                {getItemTotal(item)}
              </span>
            </div>
          ))}

          <div className="flex min-h-12 items-center justify-between gap-3 border-b border-border/24 py-2">
            <span className="text-sm font-medium text-dark sm:text-base">
              Shipping Fee
            </span>
            <span className="shrink-0 text-base font-semibold text-primary sm:text-[18px]">
              {formatPrice(order.delivery_fee)}
            </span>
          </div>

          <div className="flex min-h-12 flex-col items-start justify-between gap-2 border-b border-border/24 py-2 sm:flex-row sm:items-center sm:gap-3">
            <span className="text-sm font-medium text-dark sm:text-base">
              Payment Method
            </span>
            <span className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-dark sm:text-base">
              {formatPaymentMethod(order.payment_method)}
            </span>
          </div>

          {order.cod_payment_method ? (
            <div className="flex min-h-12 flex-col items-start justify-between gap-2 border-b border-border/24 py-2 sm:flex-row sm:items-center sm:gap-3">
              <span className="text-sm font-medium text-dark sm:text-base">
                COD Payment Method
              </span>
              <span className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-dark sm:text-base">
                {formatPaymentMethod(order.cod_payment_method)}
              </span>
            </div>
          ) : null}

          <div className="flex min-h-14 items-center justify-between gap-3 py-2">
            <span className="text-xl font-semibold leading-7 text-dark sm:text-[24px]">
              Total
            </span>
            <span className="shrink-0 text-[24px] font-semibold leading-7 text-primary sm:text-[26px]">
              {formatPrice(order.total_amount)}
            </span>
          </div>
        </div>

        {canCancelOrder ? (
          <Button
            type="button"
            size="default"
            onClick={handleCancelOrder}
            disabled={isCancelling}
            className="mt-5 h-12 w-full rounded-lg border border-[#f04438] bg-[#f04438] px-4 text-sm font-medium text-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] hover:bg-[#f04438]/90 sm:h-13.5 sm:text-base"
          >
            {isCancelling ? <Loader /> : "Cancel Order"}
          </Button>
        ) : null}
      </section>
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import { orders } from "@/data/main/account";
import type { AccountOrderTab } from "@/types/main/account";

type AccountOrdersPanelProps = {
  activeTab: AccountOrderTab;
};

export default function AccountOrdersPanel({
  activeTab,
}: AccountOrdersPanelProps) {
  return (
    <div className="mt-3 space-y-3">
      {orders.map((order) => (
        <article
          key={order.id}
          className="rounded-2xl border border-border/24 bg-bg-creamy p-2.5"
        >
          <div className="flex items-center gap-2">
            <Image
              src={order.image}
              alt={order.title}
              width={71}
              height={71}
              className="size-17.75 rounded-lg object-cover"
            />
            <div>
              <p className="text-[18px] font-semibold leading-7 text-dark">
                {order.title}
              </p>
              <p className="max-w-3xl text-sm font-medium text-gray">
                {order.details}
              </p>
            </div>
          </div>

          <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.6px] text-warm-brown">
                Total
              </p>
              <p className="text-[20px] font-semibold leading-7.5 text-primary">
                {order.total}
              </p>
            </div>

            <Link
              href={`/account?tab=${activeTab}&orderId=${order.id}`}
              className="h-10 flex items-center rounded-full bg-primary px-4 text-sm font-medium text-white"
            >
              View Order Details
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import type { AccountOrder } from "@/interfaces/main/account";
import type { AccountOrderListTab } from "@/types/main/account";

type AccountOrdersCardProps = {
  activeTab: AccountOrderListTab;
  order: AccountOrder;
};

export default function AccountOrdersCard({
  activeTab,
  order,
}: AccountOrdersCardProps) {
  return (
    <article className="rounded-2xl border border-border/24 bg-bg-creamy p-2.5">
      <div className="flex items-start gap-2">
        <Image
          src={order.image}
          alt={order.title}
          width={71}
          height={71}
          className="size-17.75 shrink-0 rounded-lg object-cover"
        />
        <div className="min-w-0">
          <p className="text-lg font-semibold leading-7 text-dark sm:text-[18px]">
            {order.title}
          </p>
          <p className="text-sm font-medium text-gray sm:max-w-3xl">
            {order.details}
          </p>
        </div>
      </div>

      <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
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
          className="flex h-10 w-full shrink-0 items-center justify-center rounded-full bg-primary px-4 text-sm font-medium text-white sm:w-auto"
        >
          View Order Details
        </Link>
      </div>
    </article>
  );
}

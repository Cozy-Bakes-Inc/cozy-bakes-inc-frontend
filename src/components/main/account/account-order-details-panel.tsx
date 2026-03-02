import Image from "next/image";
import {
  Check,
  ClipboardCheck,
  Layers,
  Package,
  ReceiptText,
  Truck,
} from "lucide-react";
import type { AccountOrderDetails } from "@/interfaces/main/account";

type AccountOrderDetailsPanelProps = {
  details: AccountOrderDetails;
};

export default function AccountOrderDetailsPanel({
  details,
}: AccountOrderDetailsPanelProps) {
  const iconByStepId = {
    placed: Layers,
    processed: ClipboardCheck,
    packed: Package,
    shipped: Truck,
    delivered: Check,
  } as const;

  return (
    <div className="mt-4 space-y-5">
      <section className="overflow-x-auto pb-2">
        <div className="relative mx-auto grid min-w-170 grid-cols-5 gap-4">
          <span className="absolute left-[10%] right-[10%] top-5 h-0.5 bg-[#3fbf5a]" />

          {details.timeline.map((step) => (
            <div
              key={step.id}
              className="relative z-10 flex flex-col items-center text-center"
            >
              {step.id === "delivered" ? (
                <div className="relative grid size-10 place-items-center rounded-full bg-[#f2f4f7] shadow-[0px_4px_10px_rgba(16,24,40,0.12)]">
                  <span className="absolute inset-0 rounded-full border border-[#eaecf0]" />
                  <span
                    className="absolute inset-0 rounded-full border-4 border-transparent border-r-[#3fbf5a] border-b-[#3fbf5a]"
                    style={{ transform: "rotate(16deg)" }}
                  />
                  <span className="grid size-6 place-items-center rounded-full border-2 border-[#1d3ea8] bg-white text-[#1d3ea8]">
                    <Check className="size-4" strokeWidth={2.4} />
                  </span>
                </div>
              ) : (
                <div className="relative grid size-10 place-items-center rounded-full border-2 border-[#3fbf5a] bg-white text-[#3fbf5a]">
                  {(() => {
                    const Icon =
                      iconByStepId[step.id as keyof typeof iconByStepId] ??
                      Layers;
                    return <Icon className="size-5" strokeWidth={2} />;
                  })()}
                </div>
              )}

              <p className="mt-3 text-sm font-medium text-dark">{step.title}</p>
              <p className="mt-1 text-xs text-gray">{step.time}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl bg-bg-creamy p-4 sm:p-6">
        <h3 className="text-xl font-medium leading-7.5 text-primary">
          Order Details
        </h3>

        <div className="mt-4 space-y-3">
          {details.items.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl border border-border/24 bg-bg-creamy p-2.5"
            >
              <div className="flex gap-2">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={71}
                  height={71}
                  className="size-17.75 rounded-lg object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-[18px] font-semibold leading-7 text-dark">
                    {item.title}
                  </p>
                  <p className="max-w-3xl text-sm font-medium text-gray">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.6px] text-warm-brown">
                    Total Price
                  </p>
                  <p className="text-[30px] font-semibold leading-7.5 text-primary">
                    {item.totalPrice}
                  </p>
                </div>

                <span className="rounded-lg bg-background px-4 py-2 text-base text-chocolate">
                  {item.quantityLabel}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-3xl bg-bg-creamy p-4 sm:p-6">
        <div className="flex items-center gap-2 text-primary">
          <ReceiptText className="size-5" />
          <h3 className="text-[28px] font-medium leading-7.5">Order Summary</h3>
        </div>

        <div className="mt-4 rounded-3xl bg-background px-4 sm:px-8">
          {details.items.map((item) => (
            <div
              key={`${item.id}-summary`}
              className="flex h-12 items-center justify-between border-b border-border/24"
            >
              <span className="text-base font-medium text-gray">
                {item.summaryLabel}
              </span>
              <span className="text-[18px] font-semibold text-dark">
                {item.summaryPrice}
              </span>
            </div>
          ))}

          <div className="flex h-12 items-center justify-between border-b border-border/24">
            <span className="text-base font-medium text-dark">
              Shipping Fee
            </span>
            <span className="text-[18px] font-semibold text-primary">
              {details.summary.shippingFee}
            </span>
          </div>

          <div className="flex h-12 items-center justify-between border-b border-border/24">
            <span className="text-base font-medium text-dark">
              Payment Methods Used
            </span>
            <span className="inline-flex items-center gap-2 text-base font-semibold text-dark">
              <span className="size-3 rounded-full bg-[#ff5f00]" />
              <span className="-ml-3 size-3 rounded-full bg-[#eb001b]" />
              <span className="size-3 rounded-full bg-[#f79e1b]" />
              {details.summary.paymentMethod}
            </span>
          </div>

          <div className="flex h-14 items-center justify-between">
            <span className="text-[28px] font-semibold leading-7 text-dark">
              Total
            </span>
            <span className="text-[30px] font-semibold leading-7 text-primary">
              {details.summary.total}
            </span>
          </div>
        </div>

        <button
          type="button"
          className="mt-5 h-13.5 w-full rounded-lg border border-[#f04438] bg-[#f04438] px-4 text-base font-medium text-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]"
        >
          Cancel Order
        </button>
      </section>
    </div>
  );
}

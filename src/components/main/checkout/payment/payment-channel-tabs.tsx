import { PaymentChannel } from "./types";
import { cn } from "@/lib";

type PaymentChannelTabsProps = {
  value: PaymentChannel;
  onChange: (next: PaymentChannel) => void;
};

const tabs: { value: PaymentChannel; label: string }[] = [
  { value: "card", label: "Credit/Debit Cards" },
  { value: "cash", label: "Cash on Delivery" },
];

export default function PaymentChannelTabs({
  value,
  onChange,
}: PaymentChannelTabsProps) {
  return (
    <div className="grid grid-cols-2 gap-2 rounded-full border border-primary bg-background p-1">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          type="button"
          onClick={() => onChange(tab.value)}
          className={cn(
            "h-11 rounded-full px-4 text-sm font-semibold transition",
            value === tab.value
              ? "bg-primary text-white"
              : "text-gray-500 hover:bg-primary/10",
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

import Image from "next/image";
import { cn } from "@/lib";
import { PaymentCardMethod } from "./types";

type PaymentMethodOptionsProps = {
  selectedMethod: PaymentCardMethod | null;
  onSelectMethod: (next: PaymentCardMethod) => void;
};

type CardLogoLayer = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className: string;
};

type CardMethodConfig = {
  id: PaymentCardMethod;
  name: string;
  iconWrapperClassName?: string;
  iconClassName: string;
  iconLayers: CardLogoLayer[];
};

const checkmarkIcon = "/images/checkmark-icon.svg";

const methods: CardMethodConfig[] = [
  {
    id: "visa",
    name: "Visa",
    iconClassName: "h-[34.724px] w-[49.916px] object-contain",
    iconWrapperClassName:
      "flex h-[34.724px] w-[49.916px] items-center justify-center rounded-[4.34px] bg-background",
    iconLayers: [
      {
        src: "/images/visa.svg",
        alt: "Visa",
        width: 50,
        height: 35,
        className: "h-full w-full object-contain",
      },
    ],
  },
  {
    id: "mastercard",
    name: "Mastercard",
    iconClassName: "h-[34.724px] w-[49.916px] object-contain",
    iconWrapperClassName:
      "flex h-[34.724px] w-[49.916px] items-center justify-center rounded-[4.34px] bg-background",
    iconLayers: [
      {
        src: "/images/mastercard.svg",
        alt: "Mastercard",
        width: 50,
        height: 35,
        className: "h-full w-full object-contain",
      },
    ],
  },
  {
    id: "amex",
    name: "American Express",
    iconClassName: "h-[34.724px] w-[49.916px] object-contain",
    iconWrapperClassName:
      "flex h-[34.724px] w-[49.916px] items-center justify-center rounded-[4.34px] bg-[#1f72cd]",
    iconLayers: [
      {
        src: "/images/american-express.svg",
        alt: "American Express",
        width: 50,
        height: 35,
        className: "h-full w-full object-contain",
      },
    ],
  },
  {
    id: "discover",
    name: "Discover",
    iconClassName: "h-[33.28px] w-[49.92px] object-contain",
    iconWrapperClassName:
      "flex h-[33.28px] w-[49.92px] items-center justify-center overflow-hidden rounded-[2px] bg-background",
    iconLayers: [
      {
        src: "/images/discover.svg",
        alt: "Discover",
        width: 50,
        height: 33,
        className: "h-full w-full object-contain",
      },
    ],
  },
];

export default function PaymentMethodOptions({
  selectedMethod,
  onSelectMethod,
}: PaymentMethodOptionsProps) {
  return (
    <div className="rounded-[14px] border border-border/24 bg-bg-creamy px-6.25 py-4">
      <p className="mb-4 text-base font-semibold leading-6 text-[#101828]">
        Select Payment method
      </p>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {methods.map((method) => (
          <button
            key={method.id}
            type="button"
            onClick={() => onSelectMethod(method.id)}
            className={cn(
              "relative flex h-25 flex-col items-center justify-center gap-3 rounded-[14px] border px-3 text-center transition",
              selectedMethod === method.id
                ? "border-border bg-border/10"
                : "border-border/24 bg-[#fcfcfd] hover:border-border",
            )}
          >
            {selectedMethod === method.id && (
              <Image
                src={checkmarkIcon}
                alt=""
                width={16}
                height={16}
                unoptimized
                className="absolute right-1.25 top-1.25 size-4"
              />
            )}
            <div className={method.iconWrapperClassName}>
              {method.iconLayers.map((layer, index) => (
                <Image
                  key={`${method.id}-${index}`}
                  src={layer.src}
                  alt={layer.alt}
                  width={layer.width}
                  height={layer.height}
                  unoptimized
                  className={cn(method.iconClassName, layer.className)}
                />
              ))}
            </div>
            <p className="text-sm font-normal leading-5 text-[#364153]">
              {method.name}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}

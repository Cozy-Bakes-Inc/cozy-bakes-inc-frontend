import Image from "next/image";
import { cn } from "@/lib";
import { PaymentCashMethod } from "./types";

type PaymentCashOptionsProps = {
  selectedMethod: PaymentCashMethod | null;
  onSelectMethod: (next: PaymentCashMethod) => void;
};

type CashMethodConfig = {
  id: PaymentCashMethod;
  subLabel: string;
  logoSrc: string;
  logoAlt: string;
  logoWidth: number;
  logoHeight: number;
  logoClassName: string;
  logoWrapperClassName?: string;
};

const cashMethods: CashMethodConfig[] = [
  {
    id: "zelle",
    subLabel: "Zelle",
    logoSrc:
      "https://www.figma.com/api/mcp/asset/bdc87ab2-1ed8-47e9-a955-78d9645da645",
    logoAlt: "Zelle",
    logoWidth: 50,
    logoHeight: 33,
    logoClassName: "h-[33.28px] w-[49.92px] object-contain",
  },
  {
    id: "venmo",
    subLabel: "Venom",
    logoSrc:
      "https://www.figma.com/api/mcp/asset/72f2cfbe-f7dd-4408-ba8c-e79e6a85beda",
    logoAlt: "Venmo",
    logoWidth: 50,
    logoHeight: 10,
    logoClassName: "h-[9.49px] w-[49.92px] object-contain",
    logoWrapperClassName:
      "flex h-[33.28px] w-[49.92px] items-center justify-center",
  },
  {
    id: "apple-pay",
    subLabel: "Apple Pay",
    logoSrc:
      "https://www.figma.com/api/mcp/asset/62b7e049-94ff-437f-b1f4-e6ff1a475b7e",
    logoAlt: "Apple Pay",
    logoWidth: 50,
    logoHeight: 33,
    logoClassName: "h-[33.28px] w-[49.92px] object-contain",
  },
  {
    id: "cash-app",
    subLabel: "Cash App",
    logoSrc:
      "https://www.figma.com/api/mcp/asset/5e5be4ff-67ef-4200-906a-7b0b42c30933",
    logoAlt: "Cash App",
    logoWidth: 70,
    logoHeight: 16,
    logoClassName: "h-[15.516px] w-[70.209px] object-contain",
    logoWrapperClassName: "flex h-[33.28px] items-center justify-center",
  },
];

const payCashIcon =
  "https://www.figma.com/api/mcp/asset/f54dcec7-5bb4-4cb6-abde-740920d4490f";
const checkmarkIcon =
  "https://www.figma.com/api/mcp/asset/25fcb7cc-be4e-4f72-89e5-69d3f99d0a22";

export default function PaymentCashOptions({
  selectedMethod,
  onSelectMethod,
}: PaymentCashOptionsProps) {
  return (
    <div className="rounded-[14px] border border-border/24 bg-bg-creamy px-6.25 py-4">
      <p className="mb-3 text-base font-semibold leading-6 text-[#101828]">
        Select Payment method
      </p>

      <div className="grid gap-4 sm:grid-cols-4">
        {cashMethods.map((method) => (
          <button
            key={method.id}
            type="button"
            onClick={() => onSelectMethod(method.id)}
            className={cn(
              "relative flex h-25 flex-col items-center justify-center gap-3 rounded-[14px] border px-3 text-center transition",
              selectedMethod === method.id
                ? "border-border bg-border/1"
                : "border-border/24 bg-background hover:border-border",
            )}
          >
            {selectedMethod === method.id && (
              <Image
                src={checkmarkIcon}
                alt=""
                width={24}
                height={24}
                unoptimized
                className="absolute right-1.5 top-1.25 size-6"
              />
            )}
            {method.logoWrapperClassName ? (
              <div className={method.logoWrapperClassName}>
                <Image
                  src={method.logoSrc}
                  alt={method.logoAlt}
                  width={method.logoWidth}
                  height={method.logoHeight}
                  unoptimized
                  className={method.logoClassName}
                />
              </div>
            ) : (
              <Image
                src={method.logoSrc}
                alt={method.logoAlt}
                width={method.logoWidth}
                height={method.logoHeight}
                unoptimized
                className={method.logoClassName}
              />
            )}
            <p className="text-sm leading-5 text-gray-700">{method.subLabel}</p>
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => onSelectMethod("pay-cash")}
        className={cn(
          "relative mt-4 flex h-28.25 w-full flex-col items-center justify-center gap-2 rounded-[14px] border py-2 text-sm text-dark transition",
          selectedMethod === "pay-cash"
            ? "border-border bg-border/1"
            : "border-border/24 bg-background hover:border-border",
        )}
      >
        {selectedMethod === "pay-cash" && (
          <Image
            src={checkmarkIcon}
            alt=""
            width={24}
            height={24}
            unoptimized
            className="absolute right-1.5 top-1.25 size-6"
          />
        )}
        <Image
          src={payCashIcon}
          alt=""
          width={100}
          height={53}
          unoptimized
          className="h-13.25 w-25 object-contain"
        />
        Pay Cash
      </button>
    </div>
  );
}

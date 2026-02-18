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
  iconWrapperClassName: string;
  iconLayers: CardLogoLayer[];
};

const checkmarkIcon =
  "https://www.figma.com/api/mcp/asset/25fcb7cc-be4e-4f72-89e5-69d3f99d0a22";

const methods: CardMethodConfig[] = [
  {
    id: "visa",
    name: "Visa",
    iconWrapperClassName:
      "relative h-[34.724px] w-[49.916px] rounded-[4.34px] border-[1.085px] border-[#e5e7eb] bg-background",
    iconLayers: [
      {
        src: "https://www.figma.com/api/mcp/asset/1681db44-2c06-4da5-8a9d-0387313f5500",
        alt: "Visa",
        width: 50,
        height: 35,
        className:
          "absolute left-[13.91%] top-[33.75%] h-[32.58%] w-[68.99%] object-contain",
      },
    ],
  },
  {
    id: "mastercard",
    name: "Mastercard",
    iconWrapperClassName:
      "relative h-[34.724px] w-[49.916px] rounded-[4.34px] border-[1.085px] border-[#e5e7eb] bg-background",
    iconLayers: [
      {
        src: "https://www.figma.com/api/mcp/asset/5f8c200d-9db7-484b-ab7d-469a30408ad7",
        alt: "Mastercard",
        width: 50,
        height: 35,
        className:
          "absolute left-[17.39%] top-[20.83%] h-[55.88%] w-[63.36%] object-contain",
      },
    ],
  },
  {
    id: "amex",
    name: "American Express",
    iconWrapperClassName:
      "relative h-[34.724px] w-[49.916px] rounded-[4.34px] border-[1.085px] border-[#e5e7eb] bg-[#1f72cd]",
    iconLayers: [
      {
        src: "https://www.figma.com/api/mcp/asset/61328a43-d57d-47d0-b475-f5b740454b9f",
        alt: "American Express",
        width: 50,
        height: 35,
        className:
          "absolute left-[8.45%] top-[35.42%] h-[30.23%] w-[81.7%] object-contain",
      },
    ],
  },
  {
    id: "discover",
    name: "Discover",
    iconWrapperClassName:
      "relative h-[34.724px] w-[49.916px] overflow-hidden rounded-[4.34px] border-[1.085px] border-black/20 bg-background",
    iconLayers: [
      {
        src: "https://www.figma.com/api/mcp/asset/4fe8e303-cc7f-4382-888c-35257318adb9",
        alt: "",
        width: 50,
        height: 35,
        className: "absolute left-[37.04%] top-[66.67%] h-[35.19%] w-[65.42%]",
      },
      {
        src: "https://www.figma.com/api/mcp/asset/3da907ff-832b-49d7-94e5-26c20c4d07ee",
        alt: "Discover",
        width: 50,
        height: 35,
        className:
          "absolute left-[7.41%] top-[38.02%] h-[21.84%] w-[85.17%] object-contain",
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
      <div className="grid gap-4 sm:grid-cols-4">
        {methods.map((method) => (
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
            <div className={method.iconWrapperClassName}>
              {method.iconLayers.map((layer, index) => (
                <Image
                  key={`${method.id}-${index}`}
                  src={layer.src}
                  alt={layer.alt}
                  width={layer.width}
                  height={layer.height}
                  unoptimized
                  className={layer.className}
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

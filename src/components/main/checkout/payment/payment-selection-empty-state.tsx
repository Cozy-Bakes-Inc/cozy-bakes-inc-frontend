import Image from "next/image";

type PaymentSelectionEmptyStateProps = {
  selected: boolean;
};

const paymentCardsIcon =
  "https://www.figma.com/api/mcp/asset/702aa6f6-9e49-4d1f-801a-bb3ab592236b";

export default function PaymentSelectionEmptyState({
  selected,
}: PaymentSelectionEmptyStateProps) {
  return (
    <div className="py-10 text-center">
      <div className="mx-auto mb-4 flex items-center justify-center">
        <Image
          src={paymentCardsIcon}
          alt="Payment cards"
          width={182}
          height={102}
          unoptimized
          className="h-25.5 w-45.5 object-contain"
        />
      </div>
      <h3 className="text-2xl font-semibold text-dark">
        Select a <span className="text-primary">Payment Method</span>
      </h3>
      <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-400">
        {selected
          ? "Payment method selected successfully. You can now complete your order securely."
          : "Please choose one of the available payment options below to complete your order securely and without interruption."}
      </p>
    </div>
  );
}

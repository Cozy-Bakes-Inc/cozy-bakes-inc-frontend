import ReceiverDetailsFields from "../receiver-details-fields";
import CheckoutSectionCard from "./checkout-section-card";

export default function ReceiverDetailsForm() {
  return (
    <CheckoutSectionCard title="Receiver Details">
      <ReceiverDetailsFields />
    </CheckoutSectionCard>
  );
}

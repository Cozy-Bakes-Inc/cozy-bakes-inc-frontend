"use client";

import { useAuthenticatedUser } from "@/hooks";
import { useDeliveryPickupModalStore } from "@/store/delivery-pickup-modal-store";
import { useEffect, useRef } from "react";
import ReceiverDetailsFields from "../receiver-details-fields";
import CheckoutSectionCard from "./checkout-section-card";

export default function ReceiverDetailsForm() {
  const { data: authenticatedUser } = useAuthenticatedUser(true);
  const setReceiverDetails = useDeliveryPickupModalStore(
    (state) => state.setReceiverDetails,
  );
  const hasHydratedReceiver = useRef(false);

  useEffect(() => {
    if (hasHydratedReceiver.current) return;

    const receiver = authenticatedUser?.data?.user?.receiver;
    if (!receiver) return;

    setReceiverDetails({
      firstName: receiver.first_name?.trim() || "",
      lastName: receiver.last_name?.trim() || "",
      phoneNumber: receiver.phone_number?.trim() || "",
    });
    hasHydratedReceiver.current = true;
  }, [authenticatedUser, setReceiverDetails]);

  return (
    <CheckoutSectionCard title="Receiver Details">
      <ReceiverDetailsFields />
    </CheckoutSectionCard>
  );
}

"use client";

import DeliveryPickupModal from "@/components/main/checkout/location/delivery-pickup-modal";
import { useDeliveryPickupModalStore } from "@/store/delivery-pickup-modal-store";

export default function GlobalModals() {
  const isOpen = useDeliveryPickupModalStore((state) => state.isOpen);
  const closeModal = useDeliveryPickupModalStore((state) => state.closeModal);

  return <DeliveryPickupModal open={isOpen} onClose={closeModal} />;
}


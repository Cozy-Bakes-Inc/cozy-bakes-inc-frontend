"use client";

import Modal from "@/components/ui/modal";
import { DeliveryPickupTab, DeliveryStep } from "@/types";
import { useState } from "react";
import DeliveryDetailsView from "./delivery/delivery-details-view";
import DeliveryMapView from "./delivery/delivery-map-view";
import DeliveryPickupModalHeader from "./modal-header";
import PickupView from "./pickup/pickup-view";
import DeliveryPickupTabs from "./tabs";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cart-store";

interface DeliveryPickupModalProps {
  open: boolean;
  onClose: () => void;
  onConfirmLocation?: () => void;
}

export default function DeliveryPickupModal({
  open,
  onClose,
  onConfirmLocation,
}: DeliveryPickupModalProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<DeliveryPickupTab>("delivery");
  const [deliveryStep, setDeliveryStep] = useState<DeliveryStep>("map");

  const isDeliveryDetails =
    activeTab === "delivery" && deliveryStep === "details";
  const { closeCart } = useCartStore();

  return (
    <Modal
      open={open}
      onClose={onClose}
      contentClassName="md:max-w-xl lg:max-w-4xl 2xl:max-w-6xl rounded-[24px] border border-border/24 bg-background p-4 shadow-none sm:p-6"
      titleClassName="text-dark text-lg font-semibold leading-7 md:text-xl md:leading-[30px]"
      closeButtonClassname="border-primary text-primary"
      title={
        <DeliveryPickupModalHeader
          isDeliveryDetails={isDeliveryDetails}
          onBackToMap={() => setDeliveryStep("map")}
        />
      }
    >
      {isDeliveryDetails ? (
        <DeliveryDetailsView
          onBackToMap={() => setDeliveryStep("map")}
          onSaveLocation={() => {
            onConfirmLocation?.();
            router.push("/checkout");
            onClose();
            closeCart();
          }}
        />
      ) : (
        <div className="space-y-4">
          <DeliveryPickupTabs
            activeTab={activeTab}
            onDeliveryClick={() => {
              setActiveTab("delivery");
              setDeliveryStep("map");
            }}
            onPickupClick={() => setActiveTab("pickup")}
          />

          {activeTab === "delivery" ? (
            <DeliveryMapView
              onConfirmLocation={() => setDeliveryStep("details")}
            />
          ) : (
            <PickupView
              onConfirm={() => {
                onConfirmLocation?.();
                router.push("/checkout");
                onClose();
                closeCart();
              }}
            />
          )}
        </div>
      )}
    </Modal>
  );
}

"use client";

import Modal from "@/components/ui/modal";
import {
  getCheckoutPath,
  getCheckoutUrlWithFulfillmentType,
  getFulfillmentTypeFromSearchParams,
} from "@/lib/utils/checkout";
import { DeliveryPickupTab, DeliveryStep } from "@/types";
import { useState } from "react";
import DeliveryDetailsView from "./delivery/delivery-details-view";
import DeliveryMapView from "./delivery/delivery-map-view";
import DeliveryPickupModalHeader from "./modal-header";
import PickupView from "./pickup/pickup-view";
import DeliveryPickupTabs from "./tabs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCartStore } from "@/store/cart-store";
import { useDeliveryPickupModalStore } from "@/store/delivery-pickup-modal-store";
import toast from "react-hot-toast";

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
  const pathname = usePathname();
  const isCheckoutPage = pathname.startsWith("/checkout");
  const router = useRouter();
  const searchParams = useSearchParams();
  const [localActiveTab, setLocalActiveTab] =
    useState<DeliveryPickupTab>("delivery");
  const [deliveryStep, setDeliveryStep] = useState<DeliveryStep>("map");
  const activeTab = isCheckoutPage
    ? getFulfillmentTypeFromSearchParams(searchParams)
    : localActiveTab;

  const isDeliveryDetails =
    activeTab === "delivery" && deliveryStep === "details";
  const { closeCart } = useCartStore();
  const shouldRedirectToCheckout = useDeliveryPickupModalStore(
    (state) => state.shouldRedirectToCheckout,
  );

  const handleTabChange = (nextTab: DeliveryPickupTab) => {
    if (nextTab === activeTab) return;

    setDeliveryStep("map");

    if (!isCheckoutPage) {
      setLocalActiveTab(nextTab);
      return;
    }

    router.replace(
      getCheckoutUrlWithFulfillmentType(pathname, searchParams, nextTab),
      { scroll: false },
    );

    toast.success(
      nextTab === "pickup"
        ? "Pickup point updated successfully"
        : "Delivery address updated successfully",
    );

    handleClose();
  };

  const handleClose = () => {
    setLocalActiveTab("delivery");
    setDeliveryStep("map");
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      contentClassName="gap-0 p-0 pb-4 md:max-w-xl lg:max-w-4xl 2xl:max-w-6xl rounded-[24px] border border-border/24 bg-background shadow-none"
      titleClassName="text-dark p-4 text-lg font-semibold leading-7 md:text-xl md:leading-[30px]"
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
            if (isCheckoutPage || shouldRedirectToCheckout) {
              router.push(getCheckoutPath("delivery"));
              closeCart();
            }
            handleClose();
          }}
        />
      ) : (
        <div className="space-y-4 p-4">
          <DeliveryPickupTabs
            activeTab={activeTab}
            onDeliveryClick={() => handleTabChange("delivery")}
            onPickupClick={() => handleTabChange("pickup")}
          />

          <div className="min-h-[480px] sm:min-h-[580px]">
            {activeTab === "delivery" ? (
              <DeliveryMapView
                onConfirmLocation={() => setDeliveryStep("details")}
              />
            ) : (
              <PickupView
                onConfirm={() => {
                  onConfirmLocation?.();
                  if (isCheckoutPage || shouldRedirectToCheckout) {
                    router.push(getCheckoutPath("pickup"));
                    closeCart();
                  }
                  handleClose();
                }}
              />
            )}
          </div>
        </div>
      )}
    </Modal>
  );
}

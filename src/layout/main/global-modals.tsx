"use client";

import DeliveryPickupModal from "@/components/main/checkout/location/delivery-pickup-modal";
import SystemLoader from "@/components/ui/system-loader";
import { Suspense, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDeliveryPickupModalStore } from "@/store/delivery-pickup-modal-store";

function GlobalModalsContent() {
  const isOpen = useDeliveryPickupModalStore((state) => state.isOpen);
  const openModal = useDeliveryPickupModalStore((state) => state.openModal);
  const closeModal = useDeliveryPickupModalStore((state) => state.closeModal);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("openLocation") !== "1") return;

    openModal();

    const params = new URLSearchParams(searchParams.toString());
    params.delete("openLocation");

    const nextUrl = params.toString()
      ? `${pathname}?${params.toString()}`
      : pathname;

    router.replace(nextUrl, { scroll: false });
  }, [openModal, pathname, router, searchParams]);

  return <DeliveryPickupModal open={isOpen} onClose={closeModal} />;
}

export default function GlobalModals() {
  return (
    <Suspense fallback={<SystemLoader />}>
      <GlobalModalsContent />
    </Suspense>
  );
}

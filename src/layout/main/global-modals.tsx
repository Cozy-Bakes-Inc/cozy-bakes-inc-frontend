"use client";

import DeliveryPickupModal from "@/components/main/checkout/location/delivery-pickup-modal";
import SystemLoader from "@/components/ui/system-loader";
import { Suspense, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDeliveryPickupModalStore } from "@/store/delivery-pickup-modal-store";
import { useAuthenticatedUser } from "@/hooks";
import { getCheckoutPath, hasSavedCheckoutDetails } from "@/lib/utils/checkout";

type GlobalModalsProps = {
  hasToken: boolean;
};

function GlobalModalsContent({ hasToken }: GlobalModalsProps) {
  const isOpen = useDeliveryPickupModalStore((state) => state.isOpen);
  const openModal = useDeliveryPickupModalStore((state) => state.openModal);
  const closeModal = useDeliveryPickupModalStore((state) => state.closeModal);
  const setShouldRedirectToCheckout = useDeliveryPickupModalStore(
    (state) => state.setShouldRedirectToCheckout,
  );
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: authenticatedUser, isLoading } = useAuthenticatedUser(hasToken);

  useEffect(() => {
    if (searchParams.get("openLocation") !== "1") return;
    if (hasToken && isLoading) return;

    const user = authenticatedUser?.data?.user;

    if (hasSavedCheckoutDetails(user)) {
      closeModal();
      router.replace(getCheckoutPath(user?.last_fulfillment_type), {
        scroll: false,
      });
      return;
    }

    const params = new URLSearchParams(searchParams.toString());
    params.delete("openLocation");

    const nextUrl = params.toString()
      ? `${pathname}?${params.toString()}`
      : pathname;

    setShouldRedirectToCheckout(true);
    openModal();
    router.replace(nextUrl, { scroll: false });
  }, [
    authenticatedUser,
    closeModal,
    hasToken,
    isLoading,
    openModal,
    pathname,
    router,
    searchParams,
    setShouldRedirectToCheckout,
  ]);

  return <DeliveryPickupModal open={isOpen} onClose={closeModal} />;
}

export default function GlobalModals({ hasToken }: GlobalModalsProps) {
  return (
    <Suspense fallback={<SystemLoader />}>
      <GlobalModalsContent hasToken={hasToken} />
    </Suspense>
  );
}

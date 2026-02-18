"use client";

import { create } from "zustand";

type DeliveryPickupModalState = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

export const useDeliveryPickupModalStore = create<DeliveryPickupModalState>(
  (set) => ({
    isOpen: false,
    openModal: () => set({ isOpen: true }),
    closeModal: () => set({ isOpen: false }),
  }),
);


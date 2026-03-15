"use client";

import { create } from "zustand";

export type ReceiverDetails = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
};

const defaultReceiverDetails: ReceiverDetails = {
  firstName: "Michael",
  lastName: "Anderson",
  phoneNumber: "(419) 628-9473",
};

type DeliveryPickupModalState = {
  isOpen: boolean;
  receiverDetails: ReceiverDetails;
  openModal: () => void;
  closeModal: () => void;
  setReceiverField: <K extends keyof ReceiverDetails>(
    field: K,
    value: ReceiverDetails[K],
  ) => void;
};

export const useDeliveryPickupModalStore = create<DeliveryPickupModalState>(
  (set) => ({
    isOpen: false,
    receiverDetails: defaultReceiverDetails,
    openModal: () => set({ isOpen: true }),
    closeModal: () => set({ isOpen: false }),
    setReceiverField: (field, value) =>
      set((state) => ({
        receiverDetails: {
          ...state.receiverDetails,
          [field]: value,
        },
      })),
  }),
);

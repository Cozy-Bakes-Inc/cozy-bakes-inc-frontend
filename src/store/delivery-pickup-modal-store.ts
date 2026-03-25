"use client";

import { create } from "zustand";

export type ReceiverDetails = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
};

export type DeliveryLocationDetails = {
  label: string;
  fullAddress: string;
  latitude: number;
  longitude: number;
  aptVilla: string;
  buildingCluster: string;
  streetLandmark: string;
};

const defaultReceiverDetails: ReceiverDetails = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
};

const defaultDeliveryLocation: DeliveryLocationDetails = {
  label: "Minneapolis",
  fullAddress: "425 S 7th St, Minneapolis, Minnesota 55415, USA",
  latitude: 44.97399,
  longitude: -93.26677,
  aptVilla: "",
  buildingCluster: "",
  streetLandmark: "",
};

type DeliveryPickupModalState = {
  isOpen: boolean;
  receiverDetails: ReceiverDetails;
  deliveryLocation: DeliveryLocationDetails;
  openModal: () => void;
  closeModal: () => void;
  setDeliveryLocation: (value: DeliveryLocationDetails) => void;
  setDeliveryLocationField: <K extends keyof DeliveryLocationDetails>(
    field: K,
    value: DeliveryLocationDetails[K],
  ) => void;
  setReceiverDetails: (value: ReceiverDetails) => void;
  setReceiverField: <K extends keyof ReceiverDetails>(
    field: K,
    value: ReceiverDetails[K],
  ) => void;
};

export const useDeliveryPickupModalStore = create<DeliveryPickupModalState>(
  (set) => ({
    isOpen: false,
    receiverDetails: defaultReceiverDetails,
    deliveryLocation: defaultDeliveryLocation,
    openModal: () => set({ isOpen: true }),
    closeModal: () => set({ isOpen: false }),
    setDeliveryLocation: (value) => set({ deliveryLocation: value }),
    setDeliveryLocationField: (field, value) =>
      set((state) => ({
        deliveryLocation: {
          ...state.deliveryLocation,
          [field]: value,
        },
      })),
    setReceiverDetails: (value) => set({ receiverDetails: value }),
    setReceiverField: (field, value) =>
      set((state) => ({
        receiverDetails: {
          ...state.receiverDetails,
          [field]: value,
        },
      })),
  }),
);

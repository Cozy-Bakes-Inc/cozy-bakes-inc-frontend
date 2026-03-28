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

export type PickupLocationDetails = {
  id: number | null;
  name: string;
  fullAddress: string;
  phoneNumber: string;
  email: string;
  storeDescription: string;
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

const defaultPickupLocation: PickupLocationDetails = {
  id: null,
  name: "",
  fullAddress: "",
  phoneNumber: "",
  email: "",
  storeDescription: "",
};

type DeliveryPickupModalState = {
  isOpen: boolean;
  shouldRedirectToCheckout: boolean;
  receiverDetails: ReceiverDetails;
  deliveryLocation: DeliveryLocationDetails;
  pickupLocation: PickupLocationDetails;
  openModal: () => void;
  closeModal: () => void;
  setShouldRedirectToCheckout: (value: boolean) => void;
  setDeliveryLocation: (value: DeliveryLocationDetails) => void;
  setDeliveryLocationField: <K extends keyof DeliveryLocationDetails>(
    field: K,
    value: DeliveryLocationDetails[K],
  ) => void;
  setPickupLocation: (value: PickupLocationDetails) => void;
  setReceiverDetails: (value: ReceiverDetails) => void;
  setReceiverField: <K extends keyof ReceiverDetails>(
    field: K,
    value: ReceiverDetails[K],
  ) => void;
};

export const useDeliveryPickupModalStore = create<DeliveryPickupModalState>(
  (set) => ({
    isOpen: false,
    shouldRedirectToCheckout: false,
    receiverDetails: defaultReceiverDetails,
    deliveryLocation: defaultDeliveryLocation,
    pickupLocation: defaultPickupLocation,
    openModal: () => set({ isOpen: true }),
    closeModal: () => set({ isOpen: false, shouldRedirectToCheckout: false }),
    setShouldRedirectToCheckout: (value) =>
      set({ shouldRedirectToCheckout: value }),
    setDeliveryLocation: (value) => set({ deliveryLocation: value }),
    setDeliveryLocationField: (field, value) =>
      set((state) => ({
        deliveryLocation: {
          ...state.deliveryLocation,
          [field]: value,
        },
      })),
    setPickupLocation: (value) => set({ pickupLocation: value }),
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

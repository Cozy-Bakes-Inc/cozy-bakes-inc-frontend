export type OrderLineItem = {
  id: string;
  title: string;
  priceLabel?: string;
  price: number;
  quantity: number;
  image: string;
  flavors?: Record<string, number>;
  packQuantity?: number;
};

export type PaymentChannel = "card" | "cash";

export type PaymentCardMethod = "visa" | "mastercard" | "amex" | "discover";

export type PaymentCashMethod =
  | "zelle"
  | "venmo"
  | "apple-pay"
  | "cash-app"
  | "pay-cash";

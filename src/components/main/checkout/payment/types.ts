export type OrderLineItem = {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  quantity: number;
  image: string;
};

export type PaymentChannel = "card" | "cash";

export type PaymentCardMethod = "visa" | "mastercard" | "amex" | "discover";

export type PaymentCashMethod =
  | "zelle"
  | "venmo"
  | "apple-pay"
  | "cash-app"
  | "pay-cash";

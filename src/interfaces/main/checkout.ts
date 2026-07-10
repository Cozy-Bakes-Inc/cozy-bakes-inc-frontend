export interface CheckoutItem {
  product_slug: string;
  price_id: number;
  quantity: number;
}

export interface DeliveryFeePayload {
  items: CheckoutItem[];
}

export interface ShippingRateOption {
  rate_id: string;
  provider: string;
  service: string;
  amount: string;
  currency: string;
  days?: number;
  recommended?: boolean;
}

export interface ShippingFeeApiResponse {
  status: string;
  shipping_rates: ShippingRateOption[];
}

export interface CheckoutApiResponseData {
  url?: string;
  checkout_url?: string;
  payment_url?: string;
  order_number?: string;
  order_id?: number;
  [key: string]: unknown;
}

export interface CheckoutApiResponse {
  status: string;
  message: string;
  data?: CheckoutApiResponseData;
  checkout_url?: string;
  payment_url?: string;
  url?: string;
  order_number?: string;
  order_id?: number;
}

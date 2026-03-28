export interface ShippingFeeData {
  id: number;
  fee: string;
}

export interface ShippingFeeApiResponse {
  status: string;
  message: string;
  data: ShippingFeeData;
}

export interface CheckoutApiResponseData {
  url?: string;
  checkout_url?: string;
  payment_url?: string;
  [key: string]: unknown;
}

export interface CheckoutApiResponse {
  status: string;
  message: string;
  data?: CheckoutApiResponseData;
  checkout_url?: string;
  payment_url?: string;
  url?: string;
}

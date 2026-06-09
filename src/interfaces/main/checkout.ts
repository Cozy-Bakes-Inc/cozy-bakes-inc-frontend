export interface CheckoutItem {
  product_slug: string;
  price_id: number;
  quantity: number;
}

export interface DeliveryFeePayload {
  items: CheckoutItem[];
}

export interface ShippingRate {
  provider: string;
  service: string;
  amount: string;
  currency: string;
  days?: number;
}

export interface ShippingFeeApiResponse {
  status: string;
  delivery_type: "usps_shipping" | "local_delivery";
  distance_miles: number;
  carrier?: string;
  shipping_rate: ShippingRate;
  rule?: {
    max_miles: number;
  };
  parcel_used?: {
    distance_unit: string;
    height: number;
    length: number;
    mass_unit: string;
    weight: number;
    width: number;
  };
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

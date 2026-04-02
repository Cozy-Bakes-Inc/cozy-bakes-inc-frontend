import { OrderStatus } from "@/types";

export interface OrderListLinkItem {
  url: string | null;
  label: string;
  page: number | null;
  active: boolean;
}

export interface OrderShippingDetails {
  first_name: string;
  last_name: string;
  phone_number: string;
  address_line: string;
  shop_name: string | null;
  note: string | null;
}

export interface OrderItemImageObject {
  id?: number;
  image?: string;
  url?: string;
  [key: string]: unknown;
}

export type OrderItemImage = string | OrderItemImageObject;

export interface OrderListItemDetails {
  product_id: number | string;
  slug?: string;
  title: string;
  description?: string | null;
  quantity: number | string;
  price: string;
  subtotal: string | null;
  images: OrderItemImage[];
}

export interface OrderListItem {
  id: number;
  order_number: string;
  subtotal: string;
  delivery_fee: string;
  total_amount: string;
  status: OrderStatus;
  payment_status: string;
  payment_method: string;
  cod_payment_method: string | null;
  fulfillment_type: string;
  shipping: OrderShippingDetails | null;
  items: OrderListItemDetails[];
  created_at: string;
  updated_at: string;
}

export interface OrderListPaginationData {
  current_page: number;
  data: OrderListItem[];
  first_page_url: string;
  from: number | null;
  last_page: number;
  last_page_url: string;
  links: OrderListLinkItem[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number | null;
  total: number;
}

export interface OrderListApiResponse {
  status: string;
  message: string;
  data: OrderListPaginationData;
}

export interface SingleOrderApiResponse {
  status: string;
  message: string;
  data: OrderListItem;
}

export interface ShopListLinkItem {
  url: string | null;
  label: string;
  page: number | null;
  active: boolean;
}

export interface ShopListItem {
  id: number;
  slug: string;
  name: string;
  phone_number: string;
  email: string;
  address_line: string;
  store_description: string | null;
  is_active: number;
  created_at: string;
  updated_at: string;
}

export interface ShopListPaginationData {
  current_page: number;
  data: ShopListItem[];
  first_page_url: string;
  from: number | null;
  last_page: number;
  last_page_url: string;
  links: ShopListLinkItem[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number | null;
  total: number;
}

export interface ShopListApiResponse {
  status: string;
  message: string;
  data: ShopListPaginationData;
}

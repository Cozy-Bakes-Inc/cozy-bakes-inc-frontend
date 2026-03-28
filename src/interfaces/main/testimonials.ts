export interface TestimonialLinkItem {
  url: string | null;
  label: string;
  page: number | null;
  active: boolean;
}

export interface TestimonialItem {
  id: number;
  customer_name: string;
  rating: number;
  review_text: string;
  date: string | null;
}

export interface TestimonialPaginationData {
  current_page: number;
  data: TestimonialItem[];
  first_page_url: string;
  from: number | null;
  last_page: number;
  last_page_url: string;
  links: TestimonialLinkItem[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number | null;
  total: number;
}

export interface TestimonialsApiResponse {
  status: string;
  data: TestimonialPaginationData;
}

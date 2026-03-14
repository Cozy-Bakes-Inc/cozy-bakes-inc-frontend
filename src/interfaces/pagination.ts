export interface PaginationMeta<TItem = unknown> {
  current_page: number;
  data: TItem[];
  last_page: number;
  next_page_url: string | null;
}

export interface PaginatedApiResponse<TItem = unknown> {
  status: string;
  data: PaginationMeta<TItem>;
}

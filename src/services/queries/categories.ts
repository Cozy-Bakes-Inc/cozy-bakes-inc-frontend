import { PAGE_SIZE } from "@/constants";
import { baseAPI } from "..";

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

export const listCategoryAPI = async (page: number) =>
  await baseAPI<PaginatedApiResponse>(
    "GET",
    `/category/list?sort=popular&page=${page}&per_page=${PAGE_SIZE}`,
  );

export const getCategorySubcategoriesAPI = async (slug: string, page: number) =>
  await baseAPI<PaginatedApiResponse>(
    "GET",
    `/category/${slug}/view?sort=most_products&page=${page}&per_page=${PAGE_SIZE}`,
  );

export const listSubcategoryAPI = async (page: number) =>
  await baseAPI<PaginatedApiResponse>(
    "GET",
    `/sub-category/list?sort=most_products&page=${page}&per_page=${PAGE_SIZE}`,
  );

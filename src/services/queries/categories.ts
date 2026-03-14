import { PAGE_SIZE } from "@/constants";
import type {
  ApiProductItem,
  CategoriesApiResponse,
  CategorySubcategoriesApiResponse,
  PaginatedApiResponse,
  SubcategoryItem,
} from "@/interfaces";
import { baseAPI } from "..";

export const listCategoriesAPI = async (page: number) =>
  await baseAPI<CategoriesApiResponse>(
    "GET",
    `/category/list?sort=popular&page=${page}&per_page=${PAGE_SIZE}`,
  );

export const getCategorySubcategoriesAPI = async (slug: string, page: number) =>
  await baseAPI<CategorySubcategoriesApiResponse>(
    "GET",
    `/category/${slug}/view?sort=most_products&page=${page}&per_page=${PAGE_SIZE}`,
  );

export const listSubcategoriesAPI = async (page: number) =>
  await baseAPI<PaginatedApiResponse<SubcategoryItem>>(
    "GET",
    `/sub-category/list?sort=most_products&page=${page}&per_page=${PAGE_SIZE}`,
  );

export const listProductsBySubcategoryAPI = async (
  slug: string,
  page: number,
) =>
  await baseAPI<PaginatedApiResponse<ApiProductItem>>(
    "GET",
    `/sub-category/${slug}/products?sort=latest&page=${page}&per_page=${PAGE_SIZE}`,
  );

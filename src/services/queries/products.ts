import { PAGE_SIZE } from "@/constants";
import type { ApiProductItem, PaginatedApiResponse } from "@/interfaces";
import type { SingleProductResponse } from "@/types";
import { baseAPI } from "..";

export const listProductsInfiniteAPI = async (
  sort: string = "random",
  page: number,
) =>
  await baseAPI<PaginatedApiResponse<ApiProductItem>>(
    "GET",
    `/product/list?sort=${sort}&page=${page}&per_page=${PAGE_SIZE}`,
  );

export const listProductsPreviewAPI = async (
  sort: string = "random",
  pageSize: number = 3,
) =>
  await baseAPI<PaginatedApiResponse<ApiProductItem>>(
    "GET",
    `/product/list?sort=${sort}&page=1&per_page=${pageSize}`,
  );

export const bestSellingInfiniteAPI = async (page: number) =>
  await baseAPI<PaginatedApiResponse<ApiProductItem>>(
    "GET",
    `/product/best-selling?sort=highest&page=${page}&per_page=${PAGE_SIZE}`,
  );

export const bestSellingPreviewAPI = async () =>
  await baseAPI<PaginatedApiResponse<ApiProductItem>>(
    "GET",
    "/product/best-selling?sort=highest&page=1&per_page=3",
  );

export const listRecommendedProductsInfiniteAPI = async (page: number) =>
  await baseAPI<PaginatedApiResponse<ApiProductItem>>(
    "GET",
    `/product/recommend?page=${page}&per_page=${PAGE_SIZE}`,
  );

export const listRecommendedProductsPreviewAPI = async () =>
  await baseAPI<PaginatedApiResponse<ApiProductItem>>(
    "GET",
    `/product/recommend?page=1&per_page=3`,
  );

export const singleProductAPI = async (slug: string) =>
  await baseAPI<SingleProductResponse>("GET", `/product/${slug}/view`);

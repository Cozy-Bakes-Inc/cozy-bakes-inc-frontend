import { PAGE_SIZE } from "@/constants";
import type { ShopListApiResponse } from "@/interfaces";
import { baseAPI } from "@/services";

export const listShopsAPI = async (page: number) =>
  await baseAPI<ShopListApiResponse>(
    "GET",
    `/shop/list?page=${page}&per_page=${PAGE_SIZE}`,
  );

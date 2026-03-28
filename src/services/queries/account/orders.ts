import { PAGE_SIZE } from "@/constants";
import type { OrderListApiResponse, SingleOrderApiResponse } from "@/interfaces";
import { baseAPI } from "@/services";

export const listOrdersAPI = async (status: string, page: number) =>
  await baseAPI<OrderListApiResponse>(
    "GET",
    `/order/list?sort=latest&status=${status}&per_page=${PAGE_SIZE}&page=${page}`,
  );

export const singleOrderAPI = async (orderNumber: string) =>
  await baseAPI<SingleOrderApiResponse>("GET", `/order/${orderNumber}/view`);

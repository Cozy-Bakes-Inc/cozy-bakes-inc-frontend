import { baseAPI } from "..";
import { UpcomingMarketsResponse, ListMarketResponse } from "@/types/main/farmers-market";

export const listUpcomingMarketsAPI = async () =>
  await baseAPI<UpcomingMarketsResponse>("GET", `/market/upcoming`);

export const listMarketAPI = async () =>
  await baseAPI<ListMarketResponse>("GET", "/market/upcoming-find-us");

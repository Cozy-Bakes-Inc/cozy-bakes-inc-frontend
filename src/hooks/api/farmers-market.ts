import { listMarketAPI, listUpcomingMarketsAPI } from "@/services/queries";
import { useCustomQuery } from "../useCustomQuery";

export function useUpcomingMarkets() {
  return useCustomQuery(["upcoming-markets"], () => listUpcomingMarketsAPI());
}

export function useMarkets() {
  return useCustomQuery(["markets"], () => listMarketAPI());
}

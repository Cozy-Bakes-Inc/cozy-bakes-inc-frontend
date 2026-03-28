import { useCustomInfiniteQuery } from "@/hooks/useCustomQuery";
import { listShopsAPI } from "@/services/queries/account/shipping-information";

export function useShops() {
  return useCustomInfiniteQuery(
    ["shops"],
    async ({ pageParam = 1 }) => {
      return listShopsAPI(pageParam);
    },
    {
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        const pagination = lastPage?.data;
        if (!pagination) return undefined;
        if (
          pagination.next_page_url &&
          pagination.current_page < pagination.last_page
        ) {
          return pagination.current_page + 1;
        }
        return undefined;
      },
    },
  );
}

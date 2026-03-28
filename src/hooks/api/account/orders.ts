import { useCustomInfiniteQuery, useCustomQuery } from "@/hooks/useCustomQuery";
import { listOrdersAPI, singleOrderAPI } from "@/services/queries";
import { OrderStatus } from "@/types";

export function useOrders(status: OrderStatus) {
  return useCustomInfiniteQuery(
    ["orders", status],
    async ({ pageParam = 1 }) => {
      return listOrdersAPI(status, pageParam);
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

export function useSingleOrder(orderNumber: string) {
  return useCustomQuery(
    ["singleOrder", orderNumber],
    () => singleOrderAPI(orderNumber),
    {
      enabled: !!orderNumber,
      retry: (failureCount, error) => {
        const status = (error as { response?: { status?: number } })?.response
          ?.status;

        if (status === 404) {
          return false;
        }

        return failureCount < 1;
      },
    },
  );
}

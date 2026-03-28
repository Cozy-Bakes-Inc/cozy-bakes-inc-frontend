import { listReviewsAPI } from "@/services/queries";
import { useCustomInfiniteQuery } from "../useCustomQuery";

export function useReviews() {
  return useCustomInfiniteQuery(
    ["reviews"],
    async ({ pageParam = 1 }) => {
      return listReviewsAPI(pageParam);
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

import {
  bestSellingInfiniteAPI,
  bestSellingPreviewAPI,
  listProductsInfiniteAPI,
  listProductsPreviewAPI,
  listRecommendedProductsInfiniteAPI,
  listRecommendedProductsPreviewAPI,
  singleProductAPI,
} from "@/services/queries";
import { useCustomInfiniteQuery, useCustomQuery } from "../useCustomQuery";

export function useProductsInfinite(sort: string) {
  return useCustomInfiniteQuery(
    ["products", "infinite", sort],
    async ({ pageParam = 1 }) => {
      return listProductsInfiniteAPI(sort, pageParam);
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

export function useProductsPreview(
  sort: string = "random",
  pageSize: number = 3,
  enabled: boolean = true,
) {
  return useCustomQuery(
    ["products", "preview", sort],
    () => listProductsPreviewAPI(sort, pageSize),
    { enabled },
  );
}

export function useBestSellingInfinite() {
  return useCustomInfiniteQuery(
    ["bestSelling", "infinite"],
    async ({ pageParam = 1 }) => {
      return bestSellingInfiniteAPI(pageParam);
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

export function useBestSellingPreview(enabled: boolean = true) {
  return useCustomQuery(["bestSelling", "preview"], bestSellingPreviewAPI, {
    enabled,
  });
}

export function useRecommendedProductsInfinite() {
  return useCustomInfiniteQuery(
    ["recommended", "infinite"],
    async ({ pageParam = 1 }) => {
      return listRecommendedProductsInfiniteAPI(pageParam);
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

export function useRecommendedProductsPreview(enabled: boolean = true) {
  return useCustomQuery(
    ["recommended", "preview"],
    listRecommendedProductsPreviewAPI,
    { enabled },
  );
}

export function useSingleProduct(slug: string) {
  return useCustomQuery(["singleProduct", slug], () => singleProductAPI(slug));
}

import {
  getCategorySubcategoriesAPI,
  listCategoryAPI,
  listSubcategoryAPI,
} from "@/services/queries";
import { useCustomInfiniteQuery } from "../useCustomQuery";

export function useCategories() {
  return useCustomInfiniteQuery(
    ["categories"],
    async ({ pageParam = 1 }) => {
      return listCategoryAPI(pageParam);
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

export function useCategorySubcategories(slug: string) {
  return useCustomInfiniteQuery(
    ["categorySubcategories"],
    async ({ pageParam = 1 }) => {
      return getCategorySubcategoriesAPI(slug, pageParam);
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

export function useSubcategories() {
  return useCustomInfiniteQuery(
    ["subcategories"],
    async ({ pageParam = 1 }) => {
      return listSubcategoryAPI(pageParam);
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

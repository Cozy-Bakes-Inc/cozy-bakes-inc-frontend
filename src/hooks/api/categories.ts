import {
  getCategorySubcategoriesAPI,
  listCategoriesAPI,
  listProductsBySubcategoryAPI,
  listSubcategoriesAPI,
  listSubcategoriesPreviewAPI,
} from "@/services/queries";
import { useCustomInfiniteQuery, useCustomQuery } from "../useCustomQuery";

export function useCategories() {
  return useCustomInfiniteQuery(
    ["categories"],
    async ({ pageParam = 1 }) => {
      return listCategoriesAPI(pageParam);
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
    ["categorySubcategories", slug],
    async ({ pageParam = 1 }) => {
      return getCategorySubcategoriesAPI(slug, pageParam);
    },
    {
      enabled: !!slug,
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        const pagination = lastPage?.data?.category?.sub_categories;
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
      return listSubcategoriesAPI(pageParam);
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

export function useSubcategoriesPreview(pageSize: number = 3) {
  return useCustomQuery(["subcategories", "preview", pageSize], () =>
    listSubcategoriesPreviewAPI(pageSize),
  );
}

export function useProductsBySubcategory(slug: string) {
  return useCustomInfiniteQuery(
    ["productsBySubcategory", slug],
    async ({ pageParam = 1 }) => {
      return listProductsBySubcategoryAPI(slug, pageParam);
    },
    {
      enabled: !!slug,
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

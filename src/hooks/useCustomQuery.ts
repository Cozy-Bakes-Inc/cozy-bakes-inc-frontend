import {
  useQuery,
  UseQueryOptions,
  QueryKey,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
  InfiniteData,
  QueryFunctionContext,
} from "@tanstack/react-query";

export function useCustomQuery<TData>(
  queryKey: QueryKey,
  queryFn: () => Promise<TData>,
  options?: Omit<
    UseQueryOptions<TData, unknown, TData, QueryKey>,
    "queryKey" | "queryFn"
  >
) {
  return useQuery<TData, unknown, TData, QueryKey>({
    queryKey,
    queryFn,
    ...options,
  });
}

export function useCustomInfiniteQuery<
  TPage, // شكل صفحة واحدة
  TError = unknown,
  TQueryKey extends QueryKey = QueryKey,
  TPageParam = unknown
>(
  queryKey: TQueryKey,
  queryFn: (
    context: QueryFunctionContext<TQueryKey, TPageParam>
  ) => Promise<TPage>,
  options: Omit<
    UseInfiniteQueryOptions<
      TPage, // TQueryFnData (صفحة واحدة)
      TError, // Error type
      InfiniteData<TPage, TPageParam>, // TData النهائي (كل الصفحات)
      TQueryKey, // QueryKey
      TPageParam // PageParam
    >,
    "queryKey" | "queryFn"
  >
): UseInfiniteQueryResult<InfiniteData<TPage, TPageParam>, TError> {
  return useInfiniteQuery<
    TPage,
    TError,
    InfiniteData<TPage, TPageParam>,
    TQueryKey,
    TPageParam
  >({
    queryKey,
    queryFn,
    ...options,
  });
}

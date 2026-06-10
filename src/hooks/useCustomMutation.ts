"use client";

import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export function useCustomMutation<TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: Omit<UseMutationOptions<TData, unknown, TVariables>, "mutationFn">
) {
  return useMutation<TData, unknown, TVariables>({
    mutationFn,
    ...options,
  });
}

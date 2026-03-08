import { AxiosRequestConfig } from "axios";

export type ExtraConfig = AxiosRequestConfig & { isForm?: boolean };
export type ErrorBody = {
  message: string;
  [key: string]: unknown;
};
export type ApiResult<
  T = unknown,
  E extends { message?: string } = ErrorBody,
> = {
  ok: boolean;
  status: number;
  data?: T;
  error?: E;
  message: string;
};

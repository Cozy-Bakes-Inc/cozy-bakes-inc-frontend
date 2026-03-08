import axios, { AxiosError, Method } from "axios";
import { getToken } from "@/lib";
import { ApiResult, ErrorBody, ExtraConfig } from "@/types";
import { getPayloadMessage, getValidationErrors } from "@/lib/utils/helper";

export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const api = axios.create({
  baseURL: BASE_URL,
});

export const initApi = async () => {
  const token = await getToken();
  if (token) api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const safe = async <T = unknown, E extends { message: string } = ErrorBody>(
  method: Method,
  url: string,
  data?: unknown,
  config: ExtraConfig = {},
): Promise<ApiResult<T, E>> => {
  await initApi();
  const { isForm, headers, ...rest } = config;
  try {
    const res = await api.request<T>({
      method,
      url,
      data,
      ...rest,
      headers: {
        "Content-Type": isForm ? "multipart/form-data" : "application/json",
        ...headers,
      },
    });
    const msg = (res.data as { message: string })?.message;
    return { ok: true, status: res.status, data: res.data, message: msg };
  } catch (err) {
    const e = err as AxiosError<E>;
    const payload = e.response?.data;
    const payloadMessage = getPayloadMessage(payload);
    const validationErrors = getValidationErrors(payload);
    const message =
      validationErrors.length > 0
        ? `${payloadMessage ?? e.message}: ${validationErrors.join(" ")}`
        : (payloadMessage ?? e.message);
    return {
      ok: false,
      status: e.response?.status ?? 500,
      error: payload,
      message,
    };
  }
};

// single entry point for all methods
export const safeApi = async <
  T = unknown,
  E extends { message: string } = ErrorBody,
>(
  method: Method,
  url: string,
  data?: unknown,
  config?: ExtraConfig,
) => await safe<T, E>(method, url, data, config);

export const baseAPI = async <T = unknown>(method: Method, url: string) => {
  await initApi();

  const response = await api.request<T>({
    method,
    url,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

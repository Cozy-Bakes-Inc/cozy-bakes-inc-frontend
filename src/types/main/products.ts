import type { ApiProductItem } from "@/interfaces";

export type SingleProductResponse = {
  status: string;
  message: string;
  data: ApiProductItem;
};

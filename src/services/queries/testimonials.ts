import { PAGE_SIZE } from "@/constants";
import type { TestimonialsApiResponse } from "@/interfaces";
import { baseAPI } from "..";

export const listReviewsAPI = async (page: number) =>
  await baseAPI<TestimonialsApiResponse>(
    "GET",
    `/review/list?sort=rating_high&page=${page}&per_page=${PAGE_SIZE}`,
  );

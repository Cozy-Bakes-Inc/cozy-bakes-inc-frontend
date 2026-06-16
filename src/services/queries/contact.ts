import type { ContactDetailsResponse } from "@/interfaces";
import { baseAPI } from "..";

export const contactAPI = async () =>
  await baseAPI<ContactDetailsResponse>("GET", `/contact/details`);

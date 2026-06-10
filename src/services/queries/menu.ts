import { baseAPI } from "..";
import { MenuResponse } from "@/types/main/menu";

export const menuAPI = async () =>
  await baseAPI<MenuResponse>("GET", "/menu/active");

import { menuAPI } from "@/services/queries";
import { useCustomQuery } from "../useCustomQuery";

export function useMenu() {
  return useCustomQuery(["menu"], () => menuAPI());
}

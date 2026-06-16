import { contactAPI } from "@/services/queries";
import { useCustomQuery } from "..";

export function useContact() {
  return useCustomQuery(["contact"], () => contactAPI());
}

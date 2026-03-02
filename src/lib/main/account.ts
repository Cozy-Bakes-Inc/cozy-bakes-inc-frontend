import { allTabs } from "@/data/main/account";
import type { AccountTab } from "@/types/main/account";

const DEFAULT_ACCOUNT_TAB: AccountTab = "new-order";

export function normalizeAccountTab(
  value: string | string[] | undefined,
): AccountTab {
  const rawValue = Array.isArray(value) ? value[0] : value;

  if (!rawValue) return DEFAULT_ACCOUNT_TAB;

  const isValid = allTabs.some((tab) => tab.id === rawValue);
  return isValid ? (rawValue as AccountTab) : DEFAULT_ACCOUNT_TAB;
}

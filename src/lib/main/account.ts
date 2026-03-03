import { allTabs, ordersByTab } from "@/data/main/account";
import type { AccountOrderListTab, AccountTab } from "@/types/main/account";

const DEFAULT_ACCOUNT_TAB: AccountTab = "new-order";

export function normalizeAccountTab(
  value: string | string[] | undefined,
): AccountTab {
  const rawValue = Array.isArray(value) ? value[0] : value;

  if (!rawValue) return DEFAULT_ACCOUNT_TAB;

  const isValid = allTabs.some((tab) => tab.id === rawValue);
  return isValid ? (rawValue as AccountTab) : DEFAULT_ACCOUNT_TAB;
}

export function normalizeAccountOrderId(
  tab: AccountOrderListTab,
  value: string | string[] | undefined,
): string | undefined {
  const rawValue = Array.isArray(value) ? value[0] : value;
  if (!rawValue) return undefined;

  const isValid = ordersByTab[tab].some((order) => order.id === rawValue);
  return isValid ? rawValue : undefined;
}

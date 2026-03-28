import { accountTabs, allTabs, orderTabs } from "@/data/main/account";

export type AccountTab = (typeof allTabs)[number]["id"];
export type AccountOrderTab = (typeof orderTabs)[number]["id"];
export type AccountInfoTab = (typeof accountTabs)[number]["id"];
export type AccountOrderListTab = Exclude<AccountOrderTab, "shipping-information">;

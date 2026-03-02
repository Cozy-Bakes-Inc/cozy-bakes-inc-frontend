import type { AccountTab } from "@/types/main/account";

export interface AccountTabDefinition {
  id: string;
  label: string;
  title: string;
}

export interface AccountOrder {
  id: string;
  title: string;
  details: string;
  total: string;
  image: string;
}

export interface AccountInfoContent {
  heading: string;
  description: string;
}

export interface AccountProfileUser {
  initials: string;
  name: string;
  email: string;
}

export interface AccountProps {
  activeTab: AccountTab;
}

export interface SidebarSectionProps {
  activeTab: AccountTab;
  sections: ReadonlyArray<{
    title: string;
    items: ReadonlyArray<{
      id: AccountTab;
      label: string;
    }>;
    withSignOut?: boolean;
  }>;
}

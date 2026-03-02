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

export interface AccountOrderTimelineStep {
  id: string;
  title: string;
  time: string;
  isCompleted?: boolean;
}

export interface AccountOrderDetailsItem {
  id: string;
  title: string;
  description: string;
  image: string;
  totalPrice: string;
  quantityLabel: string;
  summaryLabel: string;
  summaryPrice: string;
}

export interface AccountOrderSummary {
  shippingFee: string;
  paymentMethod: string;
  total: string;
}

export interface AccountOrderDetails {
  orderId: string;
  timeline: ReadonlyArray<AccountOrderTimelineStep>;
  items: ReadonlyArray<AccountOrderDetailsItem>;
  summary: AccountOrderSummary;
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
  activeOrderId?: string;
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

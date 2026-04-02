import type { AccountOrderListTab, AccountTab } from "@/types/main/account";

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

export interface AccountShippingAddress {
  deliverToLabel: string;
  city: string;
  fullAddress: string;
  changeAddressLabel: string;
}

export interface AccountReceiverDetails {
  title: string;
  firstNameLabel: string;
  firstName: string;
  lastNameLabel: string;
  lastName: string;
  phoneLabel: string;
  phoneNumber: string;
  countryCode: string;
  countryFlag: string;
}

export interface AccountShippingInformationData {
  sectionTitle: string;
  address: AccountShippingAddress;
  receiver: AccountReceiverDetails;
}

export interface AccountPersonalInformationData {
  sectionTitle: string;
  firstNameLabel: string;
  firstName: string;
  lastNameLabel: string;
  lastName: string;
  emailLabel: string;
  email: string;
}

export interface AccountEditPersonalInformationData {
  sectionTitle: string;
  firstNameLabel: string;
  firstName: string;
  lastNameLabel: string;
  lastName: string;
  submitLabel: string;
}

export interface AccountEditEmailData {
  sectionTitle: string;
  emailLabel: string;
  email: string;
  submitLabel: string;
}

export interface AccountEditPasswordData {
  sectionTitle: string;
  oldPasswordLabel: string;
  oldPasswordPlaceholder: string;
  newPasswordLabel: string;
  newPasswordPlaceholder: string;
  confirmPasswordLabel: string;
  confirmPasswordPlaceholder: string;
  forgotPasswordLabel: string;
  submitLabel: string;
}

export type AccountOrdersByTab = Record<
  AccountOrderListTab,
  ReadonlyArray<AccountOrder>
>;

export type AccountOrderDetailsByTab = Record<
  AccountOrderListTab,
  Record<string, AccountOrderDetails>
>;

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
  activeOrderNumber?: string;
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
  onNavigate?: () => void;
}

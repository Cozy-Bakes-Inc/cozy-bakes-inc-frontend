import type {
  AccountEditEmailData,
  AccountEditPasswordData,
  AccountEditPersonalInformationData,
  AccountInfoContent,
  AccountPersonalInformationData,
  AccountShippingInformationData,
  AccountTabDefinition,
} from "@/interfaces/main/account";

export const orderTabs = [
  {
    id: "new-order",
    label: "New Order",
    title: "New Order",
  },
  {
    id: "cancel-order",
    label: "Cancel Order",
    title: "Cancel Order",
  },
  {
    id: "complete-order",
    label: "Complete Order",
    title: "Complete Order",
  },
  {
    id: "shipping-information",
    label: "Shipping Information",
    title: "Shipping Information",
  },
] as const satisfies ReadonlyArray<AccountTabDefinition>;

export const accountTabs = [
  {
    id: "personal-information",
    label: "Personal Information",
    title: "Personal Information",
  },
  {
    id: "edit-personal-information",
    label: "Edit Personal Information",
    title: "Edit Personal Information",
  },
  {
    id: "edit-email",
    label: "Edit Email",
    title: "Edit Email",
  },
  {
    id: "edit-password",
    label: "Edit Password",
    title: "Edit Password",
  },
] as const satisfies ReadonlyArray<AccountTabDefinition>;

export const allTabs = [...orderTabs, ...accountTabs] as const;

export const accountPanelContent: Record<
  (typeof accountTabs)[number]["id"],
  AccountInfoContent
> = {
  "personal-information": {
    heading: "Personal Information",
    description: "Manage your profile details and contact information.",
  },
  "edit-personal-information": {
    heading: "Edit Personal Information",
    description: "Update your name, phone number, and delivery preferences.",
  },
  "edit-email": {
    heading: "Edit Email",
    description: "Change the email used for account notifications and login.",
  },
  "edit-password": {
    heading: "Edit Password",
    description: "Set a new secure password for your account.",
  },
};

export const shippingInformationData: AccountShippingInformationData = {
  sectionTitle: "Shipping Locations",
  address: {
    deliverToLabel: "Deliver to",
    city: "New York",
    fullAddress:
      "1600 Pennsylvania Avenue NW - White House - Washington - DC 20500",
    changeAddressLabel: "Change Address",
  },
  receiver: {
    title: "Receiver Details",
    firstNameLabel: "First Name",
    firstName: "Michael",
    lastNameLabel: "Last Name",
    lastName: "Anderson",
    phoneLabel: "Phone Number",
    phoneNumber: "(415) 628-9473",
    countryCode: "+1",
    countryFlag: "US",
  },
};

export const personalInformationData: AccountPersonalInformationData = {
  sectionTitle: "Personal Information",
  firstNameLabel: "First Name",
  firstName: "Michael",
  lastNameLabel: "Last Name",
  lastName: "Anderson",
  emailLabel: "Email",
  email: "MichaelAnderson98@gmail.com",
};

export const editPersonalInformationData: AccountEditPersonalInformationData = {
  sectionTitle: "Edit Personal Information",
  firstNameLabel: "First Name",
  firstName: "Michael",
  lastNameLabel: "Last Name",
  lastName: "Anderson",
  submitLabel: "Save Edit",
};

export const editEmailData: AccountEditEmailData = {
  sectionTitle: "Edit Email",
  emailLabel: "Email",
  email: "Cozy Bakes@gmail.com",
  submitLabel: "Edit Email",
};

export const editPasswordData: AccountEditPasswordData = {
  sectionTitle: "Edit Password",
  oldPasswordLabel: "Old Password",
  oldPasswordPlaceholder: "Old Password",
  newPasswordLabel: "New Password",
  newPasswordPlaceholder: "New Password",
  confirmPasswordLabel: "Confirm New Password",
  confirmPasswordPlaceholder: "Confirm New Password",
  forgotPasswordLabel: "Forget Password ?",
  submitLabel: "Change Password",
};

import type {
  AccountInfoContent,
  AccountOrder,
  AccountProfileUser,
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
    label: "Complet Order",
    title: "Complet Order",
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

export const orders: ReadonlyArray<AccountOrder> = [
  {
    id: "order-1",
    title: "Order Details",
    details:
      "Sourdough Bread * 2 , Multigrain Bread * 2 , Whole Grain Bread * 2 , Whole Grain Bread * 1",
    total: "$220",
    image: "/images/artisan-sourdough.jpg",
  },
  {
    id: "order-2",
    title: "Order Details",
    details:
      "Sourdough Bread * 2 , Multigrain Bread * 2 , Whole Grain Bread * 2 , Whole Grain Bread * 1",
    total: "$220",
    image: "/images/artisan-sourdough.jpg",
  },
  {
    id: "order-1",
    title: "Order Details",
    details:
      "Sourdough Bread * 2 , Multigrain Bread * 2 , Whole Grain Bread * 2 , Whole Grain Bread * 1",
    total: "$220",
    image: "/images/artisan-sourdough.jpg",
  },
  {
    id: "order-2",
    title: "Order Details",
    details:
      "Sourdough Bread * 2 , Multigrain Bread * 2 , Whole Grain Bread * 2 , Whole Grain Bread * 1",
    total: "$220",
    image: "/images/artisan-sourdough.jpg",
  },
  {
    id: "order-1",
    title: "Order Details",
    details:
      "Sourdough Bread * 2 , Multigrain Bread * 2 , Whole Grain Bread * 2 , Whole Grain Bread * 1",
    total: "$220",
    image: "/images/artisan-sourdough.jpg",
  },
  {
    id: "order-2",
    title: "Order Details",
    details:
      "Sourdough Bread * 2 , Multigrain Bread * 2 , Whole Grain Bread * 2 , Whole Grain Bread * 1",
    total: "$220",
    image: "/images/artisan-sourdough.jpg",
  },
  {
    id: "order-1",
    title: "Order Details",
    details:
      "Sourdough Bread * 2 , Multigrain Bread * 2 , Whole Grain Bread * 2 , Whole Grain Bread * 1",
    total: "$220",
    image: "/images/artisan-sourdough.jpg",
  },
  {
    id: "order-2",
    title: "Order Details",
    details:
      "Sourdough Bread * 2 , Multigrain Bread * 2 , Whole Grain Bread * 2 , Whole Grain Bread * 1",
    total: "$220",
    image: "/images/artisan-sourdough.jpg",
  },
  {
    id: "order-1",
    title: "Order Details",
    details:
      "Sourdough Bread * 2 , Multigrain Bread * 2 , Whole Grain Bread * 2 , Whole Grain Bread * 1",
    total: "$220",
    image: "/images/artisan-sourdough.jpg",
  },
  {
    id: "order-2",
    title: "Order Details",
    details:
      "Sourdough Bread * 2 , Multigrain Bread * 2 , Whole Grain Bread * 2 , Whole Grain Bread * 1",
    total: "$220",
    image: "/images/artisan-sourdough.jpg",
  },
  {
    id: "order-1",
    title: "Order Details",
    details:
      "Sourdough Bread * 2 , Multigrain Bread * 2 , Whole Grain Bread * 2 , Whole Grain Bread * 1",
    total: "$220",
    image: "/images/artisan-sourdough.jpg",
  },
  {
    id: "order-2",
    title: "Order Details",
    details:
      "Sourdough Bread * 2 , Multigrain Bread * 2 , Whole Grain Bread * 2 , Whole Grain Bread * 1",
    total: "$220",
    image: "/images/artisan-sourdough.jpg",
  },
];

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

export const profileUser: AccountProfileUser = {
  initials: "MA",
  name: "Michael Anderson",
  email: "MichaelAnderson98@gmail.com",
};

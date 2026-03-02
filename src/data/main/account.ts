import type {
  AccountInfoContent,
  AccountOrder,
  AccountOrderDetails,
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
    image: "/images/french-baguette.jpg",
  },
  {
    id: "order-3",
    title: "Order Details",
    details:
      "Sourdough Bread * 2 , Multigrain Bread * 2 , Whole Grain Bread * 2 , Whole Grain Bread * 1",
    total: "$220",
    image: "/images/bread-category.png",
  },
];

const sharedOrderDetails = {
  timeline: [
    {
      id: "placed",
      title: "Order Placed",
      time: "22 Nov, 2024 9:15",
      isCompleted: true,
    },
    {
      id: "processed",
      title: "Processed",
      time: "22 Nov, 2024 10:00",
      isCompleted: true,
    },
    {
      id: "packed",
      title: "Packed",
      time: "24 Nov, 2024 14:45",
      isCompleted: true,
    },
    {
      id: "shipped",
      title: "Shipped",
      time: "24 Nov, 2024 16:00",
      isCompleted: true,
    },
    {
      id: "delivered",
      title: "Delivered",
      time: "24 Nov, 2024 18:10",
      isCompleted: true,
    },
  ],
  items: [
    {
      id: "item-1",
      title: "Sourdough Bread",
      description:
        "Light and moist vanilla cake with Madagascar vanilla beans and silky buttercream frosting.",
      image: "/images/artisan-sourdough.jpg",
      totalPrice: "$8.50",
      quantityLabel: "Multigrain Bread * 2",
      summaryLabel: "Sourdough Bread * 2",
      summaryPrice: "$20",
    },
    {
      id: "item-2",
      title: "Multigrain Bread",
      description:
        "Light and moist vanilla cake with Madagascar vanilla beans and silky buttercream frosting.",
      image: "/images/french-baguette.jpg",
      totalPrice: "$8.50",
      quantityLabel: "Multigrain Bread * 2",
      summaryLabel: "Multigrain Bread * 2",
      summaryPrice: "$20",
    },
    {
      id: "item-3",
      title: "Whole Grain Bread",
      description:
        "Light and moist vanilla cake with Madagascar vanilla beans and silky buttercream frosting.",
      image: "/images/bread-category.png",
      totalPrice: "$8.50",
      quantityLabel: "Multigrain Bread * 2",
      summaryLabel: "Whole Grain Bread * 2",
      summaryPrice: "$20",
    },
    {
      id: "item-4",
      title: "Whole Grain Bread",
      description:
        "Light and moist vanilla cake with Madagascar vanilla beans and silky buttercream frosting.",
      image: "/images/bread-category.png",
      totalPrice: "$8.50",
      quantityLabel: "Whole Grain Bread * 1",
      summaryLabel: "Whole Grain Bread * 1",
      summaryPrice: "$20",
    },
  ],
  summary: {
    shippingFee: "$25",
    paymentMethod: "Mastercard",
    total: "$220",
  },
} as const;

export const orderDetailsById: Record<string, AccountOrderDetails> = {
  "order-1": {
    orderId: "order-1",
    timeline: sharedOrderDetails.timeline,
    items: sharedOrderDetails.items,
    summary: sharedOrderDetails.summary,
  },
  "order-2": {
    orderId: "order-2",
    timeline: sharedOrderDetails.timeline,
    items: sharedOrderDetails.items,
    summary: sharedOrderDetails.summary,
  },
  "order-3": {
    orderId: "order-3",
    timeline: sharedOrderDetails.timeline,
    items: sharedOrderDetails.items,
    summary: sharedOrderDetails.summary,
  },
};

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

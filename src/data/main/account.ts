import type {
  AccountEditEmailData,
  AccountEditPasswordData,
  AccountEditPersonalInformationData,
  AccountInfoContent,
  AccountPersonalInformationData,
  AccountOrderDetailsByTab,
  AccountOrder,
  AccountOrdersByTab,
  AccountProfileUser,
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

const newOrders: ReadonlyArray<AccountOrder> = [
  {
    id: "new-order-1",
    title: "Order Details",
    details:
      "Sourdough Bread * 2 , Multigrain Bread * 2 , Whole Grain Bread * 2 , Whole Grain Bread * 1",
    total: "$220",
    image: "/images/artisan-sourdough.jpg",
  },
  {
    id: "new-order-2",
    title: "Order Details",
    details: "Croissant * 3 , Brioche * 2 , Bagel * 2 , Baguette * 1",
    total: "$185",
    image: "/images/french-baguette.jpg",
  },
];

const cancelOrders: ReadonlyArray<AccountOrder> = [
  {
    id: "cancel-order-1",
    title: "Canceled Order",
    details: "Multigrain Bread * 2 , Whole Grain Bread * 1",
    total: "$58",
    image: "/images/french-baguette.jpg",
  },
  {
    id: "cancel-order-2",
    title: "Canceled Order",
    details: "Sourdough Bread * 1 , Bagel * 2 , Croissant * 2",
    total: "$74",
    image: "/images/artisan-sourdough.jpg",
  },
];

const completeOrders: ReadonlyArray<AccountOrder> = [
  {
    id: "complete-order-1",
    title: "Completed Order",
    details:
      "Sourdough Bread * 2 , Multigrain Bread * 2 , Whole Grain Bread * 2",
    total: "$190",
    image: "/images/bread-category.png",
  },
  {
    id: "complete-order-2",
    title: "Completed Order",
    details: "Brioche * 4 , Baguette * 2",
    total: "$140",
    image: "/images/french-baguette.jpg",
  },
];

export const ordersByTab: AccountOrdersByTab = {
  "new-order": newOrders,
  "cancel-order": cancelOrders,
  "complete-order": completeOrders,
};

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

export const orderDetailsByTab: AccountOrderDetailsByTab = {
  "new-order": {
    "new-order-1": {
      orderId: "new-order-1",
      timeline: sharedOrderDetails.timeline,
      items: sharedOrderDetails.items,
      summary: sharedOrderDetails.summary,
    },
    "new-order-2": {
      orderId: "new-order-2",
      timeline: sharedOrderDetails.timeline,
      items: sharedOrderDetails.items,
      summary: { ...sharedOrderDetails.summary, total: "$185" },
    },
  },
  "cancel-order": {
    "cancel-order-1": {
      orderId: "cancel-order-1",
      timeline: [
        {
          id: "placed",
          title: "Order Placed",
          time: "15 Jan, 2025 09:30",
          isCompleted: true,
        },
        {
          id: "processed",
          title: "Processed",
          time: "15 Jan, 2025 10:10",
          isCompleted: true,
        },
        {
          id: "packed",
          title: "Packed",
          time: "15 Jan, 2025 11:00",
          isCompleted: true,
        },
        {
          id: "shipped",
          title: "Canceled",
          time: "15 Jan, 2025 12:15",
          isCompleted: true,
        },
        {
          id: "delivered",
          title: "Refunded",
          time: "16 Jan, 2025 09:00",
          isCompleted: true,
        },
      ],
      items: sharedOrderDetails.items,
      summary: { ...sharedOrderDetails.summary, total: "$58" },
    },
    "cancel-order-2": {
      orderId: "cancel-order-2",
      timeline: sharedOrderDetails.timeline,
      items: sharedOrderDetails.items,
      summary: { ...sharedOrderDetails.summary, total: "$74" },
    },
  },
  "complete-order": {
    "complete-order-1": {
      orderId: "complete-order-1",
      timeline: sharedOrderDetails.timeline,
      items: sharedOrderDetails.items,
      summary: { ...sharedOrderDetails.summary, total: "$190" },
    },
    "complete-order-2": {
      orderId: "complete-order-2",
      timeline: sharedOrderDetails.timeline,
      items: sharedOrderDetails.items,
      summary: { ...sharedOrderDetails.summary, total: "$140" },
    },
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

export const profileUser: AccountProfileUser = {
  initials: "MA",
  name: "Michael Anderson",
  email: "MichaelAnderson98@gmail.com",
};

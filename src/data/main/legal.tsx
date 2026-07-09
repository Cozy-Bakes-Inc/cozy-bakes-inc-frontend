import {
  AlertTriangle,
  Copyright,
  CreditCard,
  Cookie,
  Eye,
  FileText,
  Lock,
  Mail,
  RefreshCw,
  RotateCcw,
  Share2,
  Shield,
  Truck,
  UserCheck,
} from "lucide-react";

export const privacyPolicySections = [
  {
    title: "Information We Collect",
    Icon: Eye,
    paragraphs: [
      "We collect information you provide directly to us, such as your name, email address, phone number, delivery address, and payment details when you create an account, place an order, or contact us.",
      "We also automatically collect certain information about your device and how you interact with our website, including your IP address, browser type, and pages visited.",
    ],
  },
  {
    title: "How We Use Your Information",
    Icon: Shield,
    paragraphs: [
      "We use the information we collect to process and deliver your orders, manage your account, communicate with you about your purchases, and improve our products and services.",
      "We may also use your information to send you promotional offers and updates, which you can opt out of at any time.",
    ],
  },
  {
    title: "Cookies & Tracking",
    Icon: Cookie,
    paragraphs: [
      "We use cookies and similar technologies to remember your preferences, keep you signed in, and understand how you use our website so we can make it better.",
      "You can control cookies through your browser settings, though disabling them may affect certain features of our site.",
    ],
  },
  {
    title: "Data Sharing & Third Parties",
    Icon: Share2,
    paragraphs: [
      "We do not sell your personal information. We may share your information with trusted third parties who help us operate our business, such as payment processors and delivery partners, solely for the purpose of fulfilling your order.",
    ],
  },
  {
    title: "Data Security",
    Icon: Lock,
    paragraphs: [
      "We implement reasonable technical and organizational measures to protect your personal information from unauthorized access, loss, or misuse. However, no method of transmission over the internet is completely secure.",
    ],
  },
  {
    title: "Your Rights & Choices",
    Icon: UserCheck,
    paragraphs: [
      "You may access, update, or delete your personal information at any time through your account settings, or by contacting us directly. You may also request a copy of the data we hold about you.",
    ],
  },
  {
    title: "Contact Us",
    Icon: Mail,
    paragraphs: [
      "If you have any questions about this Privacy Policy or how we handle your information, please reach out to us through our contact page and our team will be happy to help.",
    ],
  },
];

export const termsOfServiceSections = [
  {
    title: "Acceptance of Terms",
    Icon: FileText,
    paragraphs: [
      "By accessing or using the Cozy Bakes Inc. website and placing an order, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our services.",
    ],
  },
  {
    title: "Orders & Payments",
    Icon: CreditCard,
    paragraphs: [
      "All orders are subject to availability and confirmation. Prices are listed in the applicable currency and may change without notice. Payment must be completed at checkout before an order is processed.",
    ],
  },
  {
    title: "Delivery & Pickup",
    Icon: Truck,
    paragraphs: [
      "Delivery times and pickup windows are estimates and may vary due to factors outside our control, such as weather or high demand. Please ensure your delivery details and receiver information are accurate.",
    ],
  },
  {
    title: "Returns & Refunds",
    Icon: RotateCcw,
    paragraphs: [
      "Because our products are perishable baked goods, we are unable to accept returns. If there is an issue with your order, please contact us within 24 hours of delivery so we can make it right.",
    ],
  },
  {
    title: "User Accounts",
    Icon: UserCheck,
    paragraphs: [
      "You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account. Notify us immediately of any unauthorized use.",
    ],
  },
  {
    title: "Intellectual Property",
    Icon: Copyright,
    paragraphs: [
      "All content on this website, including images, logos, and recipes, is the property of Cozy Bakes Inc. and may not be reproduced or used without our prior written consent.",
    ],
  },
  {
    title: "Limitation of Liability",
    Icon: AlertTriangle,
    paragraphs: [
      "Cozy Bakes Inc. is not liable for any indirect, incidental, or consequential damages arising from your use of our website or products, to the fullest extent permitted by law.",
    ],
  },
  {
    title: "Changes to These Terms",
    Icon: RefreshCw,
    paragraphs: [
      "We may update these Terms of Service from time to time. Continued use of our website after changes are posted constitutes your acceptance of the revised terms.",
    ],
  },
  {
    title: "Contact Us",
    Icon: Mail,
    paragraphs: [
      "If you have any questions about these Terms of Service, please reach out to us through our contact page and our team will be happy to help.",
    ],
  },
];

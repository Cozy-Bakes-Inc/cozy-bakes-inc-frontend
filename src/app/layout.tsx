import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "@smastrom/react-rating/style.css";
import "leaflet/dist/leaflet.css";
import "./globals.css";
import QueryProvider from "@/provider";
import { Toaster } from "react-hot-toast";
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from "@/constants/seo";
import OnlineOrderingNotice from "@/components/main/online-ordering-notice";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_DESCRIPTION =
  "Cozy Bakes Inc. is a homemade bakery by Marwa, specializing in fresh, handcrafted sourdough breads, bagels, cookies, and sweet treats made with care and quality ingredients.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [{ url: DEFAULT_OG_IMAGE }],
  },
  twitter: {
    card: "summary",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Bakery",
  name: SITE_NAME,
  url: SITE_URL,
  image: `${SITE_URL}${DEFAULT_OG_IMAGE}`,
  logo: `${SITE_URL}${DEFAULT_OG_IMAGE}`,
  description: SITE_DESCRIPTION,
  founder: {
    "@type": "Person",
    name: "Marwa Embaby",
  },
  areaServed: {
    "@type": "Place",
    name: "Minneapolis/St. Paul, MN",
  },
  sameAs: [
    "https://www.facebook.com/share/1D1wAyKCKV/?mibextid=wwXIfr",
    "https://www.instagram.com/cozybakesinc?igsh=ZTR3bHFxZWlycHJ5",
    "https://www.tiktok.com/@cozybakesinc?_r=1&_t=ZS-95gOMNgVwG5",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preconnect"
          href="https://cozybakesinc.apianca.online"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://cozybakesinc.apianca.online" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          <OnlineOrderingNotice />
          {children}
          <Toaster />
        </QueryProvider>
      </body>
    </html>
  );
}

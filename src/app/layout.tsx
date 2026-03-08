import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "@smastrom/react-rating/style.css";
import "./globals.css";
import QueryProvider from "@/provider";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cozy Bakes Inc",
  description:
    "Cozy Bakes Inc. is a homemade bakery specializing in fresh, handcrafted pastries made with care and quality ingredients.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          {children}
          <Toaster />
        </QueryProvider>
      </body>
    </html>
  );
}

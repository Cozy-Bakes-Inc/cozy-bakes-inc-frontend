import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "swiper/css";
import "swiper/css/effect-fade";
import "./globals.css";
import Navbar from "@/components/navbar";

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
        <Navbar />
        {children}
      </body>
    </html>
  );
}

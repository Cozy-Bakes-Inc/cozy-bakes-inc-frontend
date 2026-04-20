"use client";

import {
  Facebook,
  Instagram,
  Phone,
  Mail,
  ChevronsRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { SVGProps } from "react";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Our Menu" },
  { href: "/categories", label: "Our Categories" },
  { href: "/story", label: "Our Story" },
  { href: "/contact", label: "Contact us" },
];

const markets = [
  {
    name: "Downtown Market",
    time: "Thursday - Jan 18 - 9:00 AM - 2:00 PM",
  },
  {
    name: "Eastside Green",
    time: "Friday - Jan 18 - 9:00 AM - 2:00 PM",
  },
];

function TikTokIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M14.25 3c.2 1.72 1.16 3.27 2.58 4.18.97.62 2.1.96 3.24.98v3.17a8.77 8.77 0 0 1-4.16-1.07v5.95a6.21 6.21 0 1 1-6.22-6.21c.33 0 .66.03.98.08v3.22a3.08 3.08 0 1 0 2.48 3.02V3h3.1Z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/images/footer.png')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-linear-to-br from-chocolate/80 to-chocolate/70" />
      <div className="absolute inset-0 bg-chocolate/90" />
      <div className="relative mx-auto max-w-7xl px-5 py-12 text-white sm:px-10 sm:py-16">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="relative h-12 w-12 rounded-full overflow-hidden bg-background/90 ring-2 ring-primary/40">
              <Image src="/images/logo.svg" alt="logo" fill />
            </div>
            <div>
              <p className="text-sm uppercase tracking-wide text-white/70">
                Cozy Bakes Inc.
              </p>
              <p className="text-xs text-white/55">Crafted with love.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              size="icon"
              variant="ghost"
              className="h-10 w-10 rounded-md bg-background/10 text-white/80 ring-1 ring-white/10 hover:bg-primary hover:text-white"
            >
              <Facebook className="h-4 w-4" />
            </Button>
            <Button
              asChild
              size="icon"
              className="h-10 w-10 rounded-md bg-primary text-white shadow-sm hover:bg-primary/90"
            >
              <a
                href="https://www.tiktok.com/@cozybakesinc?_r=1&_t=ZS-95gOMNgVwG5"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Cozy Bakes Inc. on TikTok"
              >
                <TikTokIcon className="h-4 w-4" />
              </a>
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="h-10 w-10 rounded-md bg-background/10 text-white/80 ring-1 ring-white/10 hover:bg-primary hover:text-white"
            >
              <Instagram className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="my-8 h-px bg-background/15" />

        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-xl font-semibold text-primary">
              Cozy Bakes Inc.
            </h3>
            <p className="mt-3 text-sm text-white/70">By Marwa</p>
            <p className="mt-2 text-sm text-white/70">
              Handcrafted with love, baked to perfection. Experience the warmth
              of artisan baking since 2024.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-primary">Quick Links</h4>
            <ul className="mt-3 space-y-2 text-sm text-white/70">
              {links.map((item) => (
                <li key={item.href} className="flex items-center gap-2">
                  <ChevronsRight />
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-primary">Market Days</h4>
            <div className="mt-3 space-y-4 text-sm text-white/70">
              {markets.map((market) => (
                <div key={market.name}>
                  <p className="font-semibold text-white">{market.name}</p>
                  <p className="mt-1">{market.time}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-primary">Get in Touch</h4>
            <div className="mt-3 space-y-3 text-sm text-white/70">
              <a
                href="tel:+16122276186"
                className="flex items-center gap-2 transition-colors hover:text-white"
                aria-label="Call Cozy Bakes Inc. at (612) 227-6186"
              >
                <div className="w-8 h-8 bg-background/16 flex items-center justify-center rounded-full overflow-hidden">
                  <Phone className="h-4 w-4 shrink-0" />
                </div>
                (612) 227-6186
              </a>
              <a
                href="mailto:marwa@cozybakesinc.com"
                className="flex items-center gap-2 transition-colors hover:text-white"
                aria-label="Email Cozy Bakes Inc. at marwa@cozybakesinc.com"
              >
                <div className="w-8 h-8 bg-background/16 flex items-center justify-center rounded-full overflow-hidden">
                  <Mail className="h-4 w-4 shrink-0" />
                </div>
                marwa@cozybakesinc.com
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/15 pt-6 text-xs text-white/60 sm:flex-row">
          <p>
            © 2026 Cozy Bakes Inc. All rights reserved. Made with love by Marwa.
          </p>
          <div className="flex gap-4">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
  { href: "/", label: "Home" },
  { href: "/categories", label: "Our Categories" },
  { href: "/menu", label: "Our Menu" },
  { href: "/story", label: "Our Story" },
  { href: "/farmers-market", label: "Find Us Her" },
  { href: "/contact", label: "Contact Us" },
];

export default function NavLinks({
  mobile = false,
  onNavigate,
}: {
  mobile?: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <ul
      className={clsx(
        mobile ? "flex flex-col gap-2 px-4 py-4" : "flex items-center gap-8",
      )}
    >
      {links.map((link) => {
        const active =
          link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

        return (
          <li key={link.href}>
            <Link
              href={link.href}
              onClick={onNavigate}
              className={clsx(
                "relative text-sm font-medium transition-colors",
                active ? "text-secondary" : "text-gray hover:text-secondary",
              )}
            >
              {link.label}

              {active && !mobile && (
                <span className="absolute -bottom-4 left-1/2 h-0.75 w-7 -translate-x-1/2 rounded-full bg-primary" />
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

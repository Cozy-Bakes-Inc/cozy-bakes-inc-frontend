"use client";

import { useState } from "react";
import { useEventListener } from "usehooks-ts";

import { Button } from "@/components/ui/button";
import NavActions from "./nav-actions";
import NavLinks from "./nav-links";
import NavLogo from "./nav-logo";
import { Menu } from "lucide-react";

type NavbarClientProps = {
  hasToken: boolean;
};

export default function NavbarClient({ hasToken }: NavbarClientProps) {
  const [open, setOpen] = useState(false);

  useEventListener("resize", () => {
    if (window.innerWidth >= 1024) setOpen(false);
  });

  return (
    <header className="sticky top-0 z-50 border-b shadow-sm bg-background">
      <nav className="mx-auto max-w-7xl px-4 py-2.5">
        <div className="flex h-16 items-center justify-between">
          <NavLogo />

          <div className="hidden lg:block">
            <NavLinks />
          </div>

          <div className="flex items-center gap-2">
            <NavActions hasToken={hasToken} />

            <Button
              variant="outline"
              size="icon"
              className="lg:hidden text-primary border-primary"
              onClick={() => setOpen(!open)}
            >
              <span className="sr-only">Toggle menu</span>
              <Menu strokeWidth={2.5} />
            </Button>
          </div>
        </div>
      </nav>

      {open && (
        <div className="lg:hidden border-t bg-background">
          <NavLinks mobile onNavigate={() => setOpen(false)} />
        </div>
      )}
    </header>
  );
}

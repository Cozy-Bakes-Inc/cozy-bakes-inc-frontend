"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function NavLogo() {
  const goHome = () => {
    window.location.href = "/";
  };

  return (
    <Button
      variant="ghost"
      onClick={goHome}
      className="flex items-center gap-3 p-0 hover:bg-transparent"
      aria-label="Go to home"
    >
      <Image
        src="/images/logo.svg"
        alt="Cozy Bakes Inc."
        width={160}
        height={40}
        priority
        className="w-18 h-18"
      />

      <div className="flex flex-col gap-2 items-start">
        <span className="text-light-chocolate font-bold text-lg leading-none">
          Cozy Bakes Inc.
        </span>
        <span className="text-[#BB4D00] text-sm leading-none">By Marwa</span>
      </div>
    </Button>
  );
}

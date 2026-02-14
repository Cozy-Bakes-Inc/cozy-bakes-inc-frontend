"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type CartPanelEmptyStateProps = {
  onClose: () => void;
};

export default function CartPanelEmptyState({
  onClose,
}: CartPanelEmptyStateProps) {
  return (
    <div className="mx-auto flex h-full w-full max-w-81.25 flex-col items-center justify-center gap-4 px-4 text-center">
      <div className="relative size-37.5">
        <Image src="/images/cart.gif" alt="Cart" fill />
      </div>

      <div className="space-y-2">
        <h3 className="text-[20px] font-semibold leading-7 text-dark sm:text-[24px] sm:leading-8">
          Your cart is empty for now
        </h3>
        <p className="text-xs leading-5 text-[#667085] sm:text-sm sm:leading-6">
          Add items you love and they&apos;ll appear here. Start exploring and
          find something delicious.
        </p>
      </div>

      <Link
        href="/categories"
        onClick={onClose}
        className="mt-2 inline-flex h-13.5 items-center justify-center gap-2 rounded-full border border-primary bg-primary px-6 text-sm font-medium text-white shadow-xs transition hover:bg-primary/90 sm:text-base"
      >
        Explore More Categories
        <ArrowRight className="size-5" />
      </Link>
    </div>
  );
}

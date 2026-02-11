"use client";

import { ArrowRight, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

type CartPanelActionsProps = {
  total: number;
  onClearCart: () => void;
};

export default function CartPanelActions({
  total,
  onClearCart,
}: CartPanelActionsProps) {
  return (
    <>
      <div className="mt-3 border-t border-[#EAECF0] pt-3">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold tracking-[0.06em] text-dark sm:text-sm">
            Total
          </p>
          <p className="text-2xl font-semibold leading-7 text-primary sm:text-[30px]">
            ${total.toFixed(2)}
          </p>
        </div>
      </div>

      <Button className="mt-3 h-12.5 w-full rounded-xl bg-primary text-sm text-white hover:bg-primary/90 sm:text-base">
        Check Out
        <ArrowRight className="size-4" />
      </Button>

      <Button
        variant="outline"
        onClick={onClearCart}
        className="mt-2 h-12.5 w-full rounded-xl border-primary/40 text-sm text-primary hover:bg-primary/5 hover:text-primary sm:text-base"
      >
        Clear Cart
        <Trash2 className="size-4" />
      </Button>
    </>
  );
}

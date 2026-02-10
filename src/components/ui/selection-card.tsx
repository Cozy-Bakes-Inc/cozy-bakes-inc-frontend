import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { SelectionItem } from "@/interfaces";
import Link from "next/link";

type SelectionCardProps = {
  item: SelectionItem;
};

export default function SelectionCard({ item }: SelectionCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={`/products/1`}>
      <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm">
        <div className="relative overflow-hidden">
          <motion.div
            animate={{ scale: isHovered ? 1.04 : 1 }}
            transition={{ duration: 0.35 }}
          >
            <Image
              src={item.image}
              alt={item.title}
              width={520}
              height={360}
              className="h-60 w-full object-cover"
            />
          </motion.div>
          <span className="absolute left-3 top-3 rounded-full bg-card/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
            {item.badge}
          </span>
          {item.outOfStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/35">
              <span className="rounded-xl px-6 py-3 bg-chocolate/75 text-sm font-semibold text-white border border-Taupe-Brown">
                Out of Stock
              </span>
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col p-4">
          <h3 className="text-base font-semibold text-secondary">
            {item.title}
          </h3>
          <motion.p
            className="mt-2 text-xs leading-5 text-gray"
            animate={{
              height: isHovered ? "auto" : "2em",
              opacity: isHovered ? 1 : 0.7,
            }}
            transition={{ duration: 0.25 }}
            style={{ overflow: "hidden" }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
          >
            {item.desc}
          </motion.p>
          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase text-gray">Price</p>
              <p className="text-sm font-semibold text-primary">{item.price}</p>
            </div>
            <Button
              variant={item.outOfStock ? "outline" : "default"}
              className={
                item.outOfStock
                  ? "h-9 gap-2 rounded-xl bg-primary/20 border-secondary/30 px-4 text-xs text-secondary"
                  : "h-9 gap-2 rounded-xl bg-card px-4 text-xs text-white hover:bg-card/90"
              }
            >
              {item.outOfStock ? (
                <>
                  <Bell className="size-3.5" />
                  {item.actionLabel ?? "Notify Me"}
                </>
              ) : (
                <>
                  <ShoppingBag className="size-3.5" />
                  {item.actionLabel ?? "Add"}
                </>
              )}
            </Button>
          </div>
        </div>
      </article>
    </Link>
  );
}

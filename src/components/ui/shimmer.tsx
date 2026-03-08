import type { HTMLAttributes } from "react";
import { cn } from "@/lib";

type ShimmerProps = HTMLAttributes<HTMLDivElement>;

export default function Shimmer({ className, ...props }: ShimmerProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-bg-creamy",
        className,
      )}
      {...props}
    />
  );
}

import type { HTMLAttributes } from "react";
import { cn } from "@/lib";

type ShimmerProps = HTMLAttributes<HTMLDivElement>;

export function Shimmer({ className, ...props }: ShimmerProps) {
  return (
    <div className={cn("animate-pulse bg-bg-creamy", className)} {...props} />
  );
}

type GridShimmerProps = {
  count?: number;
  className?: string;
  cardClassName?: string;
};

export function GridShimmer({
  count = 3,
  className,
  cardClassName,
}: GridShimmerProps) {
  return (
    <div
      className={cn(
        "mt-10 grid animate-in gap-6 fade-in slide-in-from-bottom-6 duration-700 sm:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className={cn(cardClassName)}>
          <Shimmer className="h-80 w-full" />
        </div>
      ))}
    </div>
  );
}

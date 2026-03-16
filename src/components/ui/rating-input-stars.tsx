"use client";

import type { MouseEvent } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib";

type RatingInputStarsProps = {
  value: number;
  max?: number;
  onChange: (value: number) => void;
  allowHalf?: boolean;
  className?: string;
  starClassName?: string;
  activeStarClassName?: string;
  inactiveStarClassName?: string;
};

export default function RatingInputStars({
  value,
  max = 5,
  onChange,
  allowHalf = true,
  className,
  starClassName,
  activeStarClassName,
  inactiveStarClassName,
}: RatingInputStarsProps) {
  const handleStarClick = (
    event: MouseEvent<HTMLButtonElement>,
    starValue: number,
  ) => {
    if (!allowHalf) {
      onChange(starValue);
      return;
    }

    const { left, width } = event.currentTarget.getBoundingClientRect();
    const isLeftHalf = event.clientX - left < width / 2;
    onChange(isLeftHalf ? starValue - 0.5 : starValue);
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {Array.from({ length: max }).map((_, index) => {
        const starValue = index + 1;
        const isFull = value >= starValue;
        const isHalf = !isFull && value >= starValue - 0.5;

        return (
          <button
            key={starValue}
            type="button"
            onClick={(event) => handleStarClick(event, starValue)}
            className="relative transition-transform hover:scale-105"
            aria-label={`Rate ${starValue} star${starValue > 1 ? "s" : ""}`}
          >
            <Star
              className={cn(
                "size-10",
                starClassName,
                inactiveStarClassName ?? "fill-transparent text-border/50",
              )}
              strokeWidth={2}
            />

            {(isFull || isHalf) && (
              <span
                className={cn(
                  "pointer-events-none absolute inset-0 overflow-hidden",
                  isHalf ? "w-1/2" : "w-full",
                )}
              >
                <Star
                  className={cn(
                    "size-10",
                    starClassName,
                    activeStarClassName ?? "fill-[#FBBF24] text-[#FBBF24]",
                  )}
                  strokeWidth={2}
                />
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

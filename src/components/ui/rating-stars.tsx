"use client";

import "@smastrom/react-rating/style.css";
import { Rating, Star } from "@smastrom/react-rating";
import { cn } from "@/lib/utils";

type RatingStarsProps = {
  value: number;
  max?: number;
  className?: string;
};

const starStyles = {
  itemShapes: Star,
  activeFillColor: "#cfaa48",
  inactiveFillColor: "#f2e9d5",
};

export default function RatingStars({ value, className }: RatingStarsProps) {
  return (
    <Rating
      style={{ maxWidth: 100 }}
      readOnly
      value={value}
      itemStyles={starStyles}
      className={cn("translate-y-px", className)}
    />
  );
}

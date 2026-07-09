"use client";

import { MessageSquareQuote, Star } from "lucide-react";
import type { ProductReviewItem } from "@/interfaces";

type ProductReviewsProps = {
  reviews?: ProductReviewItem[];
};

export default function ProductReviews({ reviews = [] }: ProductReviewsProps) {
  return (
    <section className="bg-background pb-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-10">
        <h2 className="text-lg font-semibold text-secondary">
          Customer Reviews
        </h2>

        {reviews.length > 0 ? (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-secondary/10 bg-bg-creamy px-4 py-3"
              >
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, starIndex) => {
                    const isActiveStar = starIndex < Number(review.rating);

                    return (
                      <Star
                        key={starIndex}
                        className={`size-3.5 ${
                          isActiveStar ? "text-primary" : "text-primary/25"
                        }`}
                        fill="currentColor"
                      />
                    );
                  })}
                </div>
                <p className="mt-2 text-sm leading-6 text-gray">
                  &quot;{review.review}&quot;
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-4 flex items-center gap-3 rounded-2xl border border-dashed border-secondary/15 px-4 py-3 text-sm text-gray">
            <MessageSquareQuote className="size-5 shrink-0 text-secondary/30" />
            No reviews yet. Be the first to share your experience.
          </div>
        )}
      </div>
    </section>
  );
}

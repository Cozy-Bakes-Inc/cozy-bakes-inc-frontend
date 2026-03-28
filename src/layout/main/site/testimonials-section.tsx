"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useReviews } from "@/hooks";
import { TestimonialItem } from "@/interfaces";
import { containerVariants } from "@/lib";
import { motion } from "framer-motion";
import { MessageSquareQuote, MoveRight, Quote, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GridShimmer } from "@/components/ui/shimmer";
import AddReviewModal from "./add-review-modal";

type TestimonialsSectionProps = {
  previewOnly?: boolean;
};

export default function TestimonialsSection({
  previewOnly = true,
}: TestimonialsSectionProps) {
  const [isAddReviewOpen, setIsAddReviewOpen] = useState(false);
  const {
    data: reviewsData,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useReviews();
  const testimonials: TestimonialItem[] = useMemo(
    () => reviewsData?.pages?.flatMap((page) => page?.data?.data ?? []) ?? [],
    [reviewsData],
  );
  const totalReviews =
    reviewsData?.pages?.[0]?.data?.total ?? testimonials.length;
  const visibleTestimonials = previewOnly
    ? testimonials.slice(0, 3)
    : testimonials;
  const showExploreMore = previewOnly && totalReviews > 3;

  return (
    <section className="bg-bg-creamy py-20">
      <motion.div
        className="mx-auto max-w-7xl px-5 sm:px-10"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        variants={containerVariants}
      >
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-4 py-2 text-xs font-semibold text-primary">
            <Star
              className="size-5 text-primary shrink-0"
              fill="currentColor"
            />
            Our Testimonials
          </span>
          <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-dark sm:text-3xl md:text-4xl">
            What Our, <span className="text-heading-2">Customers Say</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-gray sm:text-base">
            Real reviews from real people who love our handcrafted baked goods.
          </p>
        </div>

        {isLoading ? (
          <GridShimmer count={3} cardClassName="bg-background" />
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {visibleTestimonials.length > 0 ? (
              visibleTestimonials.map((testimonial) => (
                <article
                  key={testimonial.id}
                  className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-background p-6 shadow-sm ring-1 ring-primary/15"
                >
                  <div className="absolute right-5 top-4 text-6xl font-serif text-primary/15">
                    <Quote className="size-8" />
                  </div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, starIndex) => {
                      const isActiveStar = starIndex < testimonial.rating;

                      return (
                        <Star
                          key={`${testimonial.id}-star-${starIndex}`}
                          className={`h-4 w-4 ${isActiveStar ? "text-primary" : "text-primary/25"}`}
                          fill="currentColor"
                        />
                      );
                    })}
                  </div>
                  <p className="mt-4 line-clamp-6 min-h-[10.5rem] text-sm leading-7 text-taupe-brown sm:text-base">
                    &quot;{testimonial.review_text}&quot;
                  </p>
                  <div className="my-6 mt-auto h-px bg-primary/20" />
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-primary">
                        {testimonial.customer_name}
                      </p>
                      <p className="text-xs text-gray">
                        {testimonial.date ?? "Recent review"}
                      </p>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-bg-creamy text-sm font-semibold text-primary ring-1 ring-primary/15">
                      {testimonial.customer_name.charAt(0).toUpperCase()}
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="col-span-full overflow-hidden rounded-[2rem] border border-primary/15 bg-background shadow-[0_20px_60px_rgba(166,111,17,0.08)]">
                <div className="relative px-6 py-12 sm:px-10 sm:py-14">
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary/10 via-primary/50 to-primary/10" />
                  <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
                    <div className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary ring-8 ring-primary/5">
                      <MessageSquareQuote className="size-8" />
                    </div>
                    <h3 className="mt-6 text-xl font-bold text-dark sm:text-2xl">
                      No reviews yet
                    </h3>
                    <p className="mt-3 max-w-xl text-sm leading-7 text-gray sm:text-base">
                      Be the first to share your experience with Cozy Bakes Inc
                      and help other customers discover their next favorite
                      treat.
                    </p>
                    <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs font-medium text-primary/80 sm:text-sm">
                      <span className="rounded-full bg-primary/8 px-4 py-2 ring-1 ring-primary/10">
                        Freshly baked daily
                      </span>
                      <span className="rounded-full bg-primary/8 px-4 py-2 ring-1 ring-primary/10">
                        Handmade with care
                      </span>
                      <span className="rounded-full bg-primary/8 px-4 py-2 ring-1 ring-primary/10">
                        Loved by locals
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="mt-8 flex justify-center">
          <div className="flex flex-col items-center gap-4">
            {!previewOnly && hasNextPage ? (
              <Button
                type="button"
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className="h-11 rounded-full border border-primary bg-background px-6 text-sm font-semibold text-primary hover:bg-primary/5"
              >
                {isFetchingNextPage ? "Loading..." : "Show More"}
              </Button>
            ) : null}

            {showExploreMore ? (
              <Button
                asChild
                type="button"
                className="h-11 rounded-full border border-primary bg-background px-6 text-sm font-semibold text-primary hover:bg-primary/5"
              >
                <Link href="/testimonials">Explore More Reviews</Link>
              </Button>
            ) : null}

            <Button
              type="button"
              onClick={() => setIsAddReviewOpen(true)}
              className="h-11 gap-2 flex items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-white hover:bg-primary/90"
            >
              <span>Add Review</span> <MoveRight className="size-5" />
            </Button>
          </div>
        </div>
      </motion.div>

      <AddReviewModal
        open={isAddReviewOpen}
        onClose={() => setIsAddReviewOpen(false)}
      />
    </section>
  );
}

"use client";

import { testimonials } from "@/data";
import { cardVariants, containerVariants } from "@/lib";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

export default function TestimonialsSection() {
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

        <motion.div
          className="mt-10 grid gap-6 md:grid-cols-3"
          variants={containerVariants}
        >
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={`${testimonial.name}-${index}`}
              className="relative overflow-hidden rounded-2xl bg-background p-6 shadow-sm ring-1 ring-primary/15"
              variants={cardVariants}
            >
              <div className="absolute right-5 top-4 text-6xl font-serif text-primary/15">
                <Quote className="size-8" />
              </div>
              <div className="flex items-center gap-1 text-primary">
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <Star
                    key={`${testimonial.name}-star-${starIndex}`}
                    className="h-4 w-4 text-primary"
                    fill="currentColor"
                  />
                ))}
              </div>
              <p className="mt-4 text-sm leading-7 text-taupe-brown sm:text-base">
                &quot;{testimonial.quote}&quot;
              </p>
              <div className="my-6 h-px bg-primary/20" />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-primary">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-gray">{testimonial.date}</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-bg-creamy text-sm font-semibold text-primary ring-1 ring-primary/15">
                  {testimonial.initial}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

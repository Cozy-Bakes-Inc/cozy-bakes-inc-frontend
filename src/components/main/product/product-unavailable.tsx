"use client";

import Link from "next/link";

export default function ProductUnavailable() {
  return (
    <section className="bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-3xl px-5 sm:px-10">
        <div className="rounded-[2rem] border border-secondary/10 bg-bg-creamy px-6 py-12 text-center shadow-sm sm:px-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            404
          </p>
          <h1 className="mt-4 text-3xl font-semibold text-secondary sm:text-4xl">
            Product Not Available
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-gray sm:text-base">
            This product may have been removed, is unavailable right now, or
            the link is incorrect.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/"
              className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-card/90"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

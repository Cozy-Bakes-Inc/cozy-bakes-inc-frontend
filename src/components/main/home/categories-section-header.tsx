"use client";

import Image from "next/image";

export default function CategoriesSectionHeader() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 text-center duration-700">
      <div className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-4 py-2 text-xs font-semibold text-primary">
        <div className="shrink-0">
          <Image
            src="/images/categories.svg"
            alt="categories"
            height={20}
            width={20}
          />
        </div>
        <span>Our Categories</span>
      </div>
      <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-dark sm:text-4xl">
        Crafted for, <span className="text-heading-2">Every Taste</span>
      </h2>
      <p className="mx-auto mt-3 max-w-2xl text-sm text-gray sm:text-base">
        From daily breads to handcrafted pastries and special orders, our
        categories are thoughtfully baked to suit every taste and moment.
      </p>
    </div>
  );
}

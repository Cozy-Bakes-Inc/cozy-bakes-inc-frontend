import { ArrowRight } from "lucide-react";
import { categoryItems } from "@/data";
import CategoryCard from "@/components/ui/category-card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function CategoriesSection() {
  return (
    <section className="relative overflow-x-hidden bg-background py-20">
      <div className="pointer-events-none absolute -left-10 top-10 hidden size-32 rounded-full border border-primary/20 sm:block" />
      <div className="pointer-events-none absolute -right-12 bottom-10 hidden size-36 rounded-full border border-primary/20 sm:block" />

      <div className="mx-auto max-w-7xl px-5 sm:px-10">
        <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-4 py-2 text-xs font-semibold text-primary">
            <div className="shrink-0">
              <Image
                src="/images/categories.svg"
                alt="beard"
                height={20}
                width={20}
              />
            </div>
            <span> Our Categories</span>
          </div>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-dark sm:text-4xl">
            Crafted for, <span className="text-heading-2">Every Taste</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-gray sm:text-base">
            From daily breads to handcrafted pastries and special orders, our
            categories are thoughtfully baked to suit every taste and moment.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 animate-in fade-in slide-in-from-bottom-6 duration-700">
          {categoryItems.map((item) => (
            <CategoryCard key={item.id} item={item} />
          ))}
        </div>

        <div className="mt-10 flex justify-center animate-in fade-in slide-in-from-bottom-6 duration-700">
          <Button className="h-10 rounded-full bg-primary px-6 text-xs font-semibold text-white hover:bg-primary/90">
            Explore More Categories
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}

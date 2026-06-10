"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Shimmer } from "@/components/ui/shimmer";
import { useMenu } from "@/hooks/api";
import { usePdfMenu } from "@/hooks/usePdfMenu";

export default function MenuSection() {
  const { data: menuData, isLoading: isMenuLoading } = useMenu();
  const menu = menuData?.data;

  const {
    categories,
    isLoading: isPdfLoading,
    error,
  } = usePdfMenu(menu?.pdf_file_link);

  const isLoading = isMenuLoading || isPdfLoading;

  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-10">
        <div className="mb-6 flex justify-end">
          {isMenuLoading ? (
            <Shimmer className="h-11 w-48 rounded-xl" />
          ) : (
            <Button asChild className="h-11 px-5">
              <a
                href={menu?.pdf_file_link}
                target="_blank"
                rel="noreferrer"
                download
              >
                <Download className="size-4" />
                Download Menu PDF
              </a>
            </Button>
          )}
        </div>

        {isLoading ? (
          <div className="space-y-6">
            {Array.from({ length: 2 }).map((_, i) => (
              <Shimmer key={i} className="h-44 w-full rounded-2xl" />
            ))}
          </div>
        ) : error ? (
          <p className="text-center text-sm text-taupe-brown">{error}</p>
        ) : (
          <div className="space-y-6">
            {categories.map((section, index) => (
              <article
                key={`${section.title}-${index}`}
                className="rounded-2xl border border-primary/15 bg-background p-6 shadow-sm"
              >
                <h3 className="text-2xl font-semibold tracking-tight text-primary sm:text-[2rem]">
                  {section.title}
                </h3>
                <div className="mt-4 space-y-2">
                  {section.items.map((item, itemIndex) => (
                    <div
                      key={`${item.name}-${itemIndex}`}
                      className="flex items-center justify-between gap-2 border-b border-primary/15 py-3 last:border-b-0"
                    >
                      <p className="break-words text-sm font-medium italic text-dark">
                        {item.name}
                      </p>
                      <p className="shrink-0 text-sm font-semibold text-primary text-right">
                        {item.price}
                      </p>
                    </div>
                  ))}
                </div>
                {section.extraText && (
                  <div className="mt-4 rounded-2xl border border-primary/20 bg-bg-creamy/70 px-4 py-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-secondary">
                      {section.extraLabel}
                    </p>
                    <p className="mt-2 text-xs leading-5 text-taupe-brown">
                      {section.extraText}
                    </p>
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

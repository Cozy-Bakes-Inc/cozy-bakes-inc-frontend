"use client";

import { useMemo, useState } from "react";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { selectionItems, selectionTabs } from "@/data";
import SelectionCard from "@/components/ui/selection-card";

export default function SelectionSection() {
  const [activeTab, setActiveTab] = useState(selectionTabs[0]?.value ?? "best");

  const filteredItems = useMemo(
    () => selectionItems.filter((item) => item.category === activeTab),
    [activeTab],
  );

  return (
    <section className="bg-bg-creamy py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-10">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold text-primary">
            <Sparkles className="size-3.5" />
            Our Selection
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-dark sm:text-4xl">
            Freshly Baked,{" "}
            <span className="text-heading-2">Thoughtfully Chosen</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-gray sm:text-base">
            A curated collection of best selling and most recommended items.
          </p>
        </div>

        <div className="mt-6 flex justify-center">
          <div className="inline-flex rounded-full bg-white p-1 shadow-sm">
            {selectionTabs.map((tab) => {
              const isActive = tab.value === activeTab;
              return (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => setActiveTab(tab.value)}
                  className={cn(
                    "rounded-full px-5 py-2 text-xs font-semibold transition",
                    isActive
                      ? "bg-primary text-white shadow-sm"
                      : "text-gray hover:text-dark",
                  )}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <SelectionCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

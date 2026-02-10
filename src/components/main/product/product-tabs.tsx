"use client";

import { useMemo, useState } from "react";

const tabs = [
  { id: "ingredients", label: "Ingredients" },
  { id: "allergens", label: "Allergens" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export default function ProductTabs() {
  const [activeTab, setActiveTab] = useState<TabId>("ingredients");

  const tabContent = useMemo(() => {
    if (activeTab === "allergens") {
      return [
        "Contains wheat (gluten).",
        "Produced in a facility that also handles nuts, dairy, and eggs.",
        "May contain trace amounts of sesame.",
      ];
    }

    return [
      "Organic bread flour, filtered water, sea salt, wild yeast culture.",
      "Optional: sesame seeds or sunflower seeds on request.",
      "Slow-fermented dough baked in stone-deck ovens.",
    ];
  }, [activeTab]);

  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-10">
        <div className="grid grid-cols-2 gap-4 text-sm sm:text-base rounded-full border border-primary/50 bg-bg-creamy p-2">
          {tabs.map((tab) => {
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={
                  isActive
                    ? "rounded-full bg-primary px-5 py-2 font-semibold text-white"
                    : "rounded-full px-5 py-2 font-semibold text-secondary/70 transition hover:text-secondary"
                }
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="mt-6 rounded-3xl bg-bg-creamy p-6 text-sm leading-7 text-gray shadow-sm sm:p-8">
          <h2 className="text-lg font-semibold text-secondary">
            {activeTab === "ingredients"
              ? "Ingredients"
              : "Allergens & Dietary Notes"}
          </h2>
          <ul className="mt-4 space-y-3">
            {tabContent.map((text, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                <span className="text-sm sm:text-base">{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useMemo, useState } from "react";

const tabs = [
  { id: "ingredients", label: "Ingredients" },
  { id: "allergens", label: "Allergens" },
] as const;

type TabId = (typeof tabs)[number]["id"];

type ProductTabsProps = {
  ingredients?: string | null;
  allergens?: string | null;
};

function normalizeTabContent(value?: string | null) {
  if (!value) return "";

  return value
    .split(/[\n,]+/)
    .map((item) => item.trim())
    .filter(Boolean)
    .join(", ");
}

export default function ProductTabs({
  ingredients,
  allergens,
}: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>("ingredients");

  const tabContent = useMemo(() => {
    if (activeTab === "allergens") {
      return normalizeTabContent(allergens);
    }

    return normalizeTabContent(ingredients);
  }, [activeTab, allergens, ingredients]);

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
          {tabContent ? (
            <p className="mt-4 text-sm sm:text-base">
              {tabContent}
            </p>
          ) : (
            <p className="mt-4 text-sm sm:text-base">
              {activeTab === "ingredients"
                ? "No ingredients available for this product."
                : "No allergen information available for this product."}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

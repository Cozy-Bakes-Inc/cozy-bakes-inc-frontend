import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

type MenuItem = {
  name: string;
  price: string;
};

type MenuSection = {
  title: string;
  items: MenuItem[];
  extraLabel?: string;
  extraText?: string;
};

const menuSections: MenuSection[] = [
  {
    title: "Sourdough",
    items: [
      { name: "Plain", price: "$12" },
      { name: "Inclusion Loaves", price: "$14" },
    ],
    extraLabel: "Flavours",
    extraText:
      "Chocolate Chocolate Chip, Chocolate Chip, Chocolate Cherry, Jalapeno Cheddar, Caramelized Onion & Smoked Gouda, Sun Dried Tomato, Roasted Red Pepper & Cream Cheese, Roasted Red Pepper & Garlic Confit, Italian Herb & Cheese, Cinnamon Raisin, Zatar Mozzarella, Garlic Herb, Blueberry Lemon Lavender, Blueberry Cream Cheese, Cherry Walnut, Maple Pecan, Cinnamon Sugar, Beef Pepperoni Mozzarella, and more.",
  },
  {
    title: "Pull Apart Loaves",
    items: [
      { name: "Sandwich Loaf", price: "$12" },
      { name: "Brioche", price: "$12" },
      { name: "Brioche Raisin", price: "$13" },
      { name: "Brioche Mixed Berries", price: "$17" },
      { name: "French Baguette", price: "$8" },
      { name: "Ciabatta", price: "$7" },
      { name: "Rustic Cheddar Loaf", price: "$17" },
      { name: "Italian Herb & Cheese - Medium", price: "$16" },
      { name: "Italian Herb & Cheese - Large", price: "$22" },
      { name: "Caramel Apple Cinnamon - Medium", price: "$16" },
      { name: "Caramel Apple Cinnamon - Large", price: "$22" },
      { name: "Blueberry Lemon - Medium", price: "$16" },
      { name: "Blueberry Lemon - Large", price: "$22" },
      {
        name: "Roasted Red Pepper with Mozzarella & Garlic Confit - Medium",
        price: "$16",
      },
      {
        name: "Roasted Red Pepper with Mozzarella & Garlic Confit - Large",
        price: "$22",
      },
    ],
  },
  {
    title: "Bagels",
    items: [
      { name: "Pack of 6", price: "$18" },
      { name: "Pack of 12", price: "$36" },
    ],
    extraLabel: "Flavours",
    extraText:
      "Plain, Cinnamon Raisin, Cinnamon Sugar, Blueberry, Jalapeno Cheddar, Zatar, Italian Herb & Cheese, Everything, Sesame, Garlic & Herb.",
  },
  {
    title: "Mix and Match",
    items: [
      { name: "Sandwich Bread", price: "$17 or 2 for $30" },
      { name: "Bagels", price: "6 for $18 or 12 for $35" },
      { name: "English Muffins", price: "6 for $15 or 12 for $29" },
      { name: "Rolls", price: "6 for $12 or 12 for $20" },
      { name: "Orange Almond Cake", price: "$25" },
    ],
  },
  {
    title: "Sweet Treats",
    items: [
      { name: "Cinnamon Rolls", price: "$5 each" },
      { name: "Caramel Rolls", price: "$5 each" },
      { name: "Chocolate Rolls", price: "$5 each" },
      { name: "Pack of 3", price: "$15" },
      { name: "Pack of 6", price: "$28" },
    ],
  },
  {
    title: "Bread Pudding",
    items: [
      { name: "Small", price: "$20" },
      { name: "Medium", price: "$39" },
      { name: "Large", price: "$75" },
    ],
    extraLabel: "Flavours",
    extraText:
      "Caramel, Custard, Berry, Caramel Pecan, Peach, Cinnamon Raisin.",
  },
  {
    title: "Fiteer",
    items: [
      { name: "Plain Small", price: "$17" },
      { name: "Plain Medium", price: "$30" },
      { name: "Plain Large", price: "$39" },
      { name: "Sweet Customized", price: "$20" },
      { name: "Savory Customized", price: "$25" },
    ],
  },
  {
    title: "Cookies",
    items: [
      { name: "Single Cookie", price: "$4 each" },
      { name: "Pack of 4", price: "$15" },
    ],
  },
  {
    title: "Vanilla Extracts & Pastes",
    items: [
      { name: "Bourbon Vanilla Bean Paste 5 oz", price: "$35" },
      { name: "Bourbon Vanilla Extract 4 oz", price: "$25" },
      { name: "Bourbon Vanilla Extract 8 oz", price: "$45" },
    ],
  },
  {
    title: "Preserves",
    items: [
      { name: "Madagascar Mango Preserves 8 oz", price: "$8" },
      { name: "Madagascar Mango Preserves 16 oz", price: "$15" },
      { name: "Lip Smacking Strawberry Hibiscus Preserves 8 oz", price: "$8" },
      { name: "Lip Smacking Strawberry Hibiscus Preserves 16 oz", price: "$15" },
      { name: "Mixed Berry Preserves 8 oz", price: "$8" },
      { name: "Mixed Berry Preserves 16 oz", price: "$15" },
    ],
  },
  {
    title: "Special Order Cakes & Cupcakes",
    items: [
      { name: "Small", price: "$20" },
      { name: "Medium", price: "$39" },
      { name: "Large", price: "$75" },
    ],
    extraLabel: "Order details",
    extraText: "Call or text Marwa at 612-227-6186 to place a custom order.",
  },
];

export default function MenuSection() {
  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-10">
        <div className="mb-6 flex justify-end">
          <Button asChild className="h-11 px-5">
            <a href="/cozy-bakes-menu.pdf" download="cozy-bakes-menu.pdf">
              <Download className="size-4" />
              Download Menu PDF
            </a>
          </Button>
        </div>

        <div className="space-y-6">
          {menuSections.map((section, index) => (
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
                    className="flex items-center justify-between gap-4 border-b border-primary/15 py-3 last:border-b-0"
                  >
                    <p className="text-sm font-medium italic text-dark">
                      {item.name}
                    </p>
                    <p className="shrink-0 text-sm font-semibold text-primary">
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
      </div>
    </section>
  );
}

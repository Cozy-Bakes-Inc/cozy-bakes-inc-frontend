const menuSections = [
  {
    title: "Sourdough",
    items: [
      { name: "Plain Bagel", price: "$8.50" },
      { name: "Plain Bagel", price: "$8.50" },
      { name: "Plain Bagel", price: "$8.50" },
    ],
    flavors:
      "Chocolate Chocolate Chip, Chocolate Chip, Chocolate Cherry, Jalapeno Cheddar, Caramelized Onion & Smoked Gouda, Sun Dried Tomato, Roasted Red Pepper & Green Chiles, Roasted Red Pepper & Garlic, Carrot, Raisin Herb & Cheese, Cinnamon Raisin, Zatar Mozzarella, Garlic Herb, Blueberry Lemon Lavender, Blueberry Cream Cheese, Cheesy Walnut, Maple Pecan, Cinnamon Sugar, Beef Pepperoni Mozzarella, and More!",
  },
  {
    title: "Breads",
    items: [
      { name: "Sandwich Loaf", price: "$8.50" },
      { name: "Accordion Loaf", price: "$8.50" },
      { name: "Accordion Loaf", price: "$8.50" },
      { name: "Brown Baguette", price: "$8.50" },
      { name: "Brioche Mixed Berries", price: "$8.50" },
      { name: "Rye Pack of 6", price: "$8.50" },
      { name: "Soft Dinner Rolls Pack of 6", price: "$8.50" },
      { name: "Soft Dinner Rolls Pack of 12", price: "$8.50" },
      { name: "Ciabatta", price: "$8.50" },
    ],
  },
  {
    title: "Sourdough",
    items: [
      { name: "Plain Bagel", price: "$8.50" },
      { name: "Plain Bagel", price: "$8.50" },
      { name: "Plain Bagel", price: "$8.50" },
    ],
    flavors:
      "Chocolate Chocolate Chip, Chocolate Chip, Chocolate Cherry, Jalapeno Cheddar, Caramelized Onion & Smoked Gouda, Sun Dried Tomato, Roasted Red Pepper & Green Chiles, Roasted Red Pepper & Garlic, Carrot, Raisin Herb & Cheese, Cinnamon Raisin, Zatar Mozzarella, Garlic Herb, Blueberry Lemon Lavender, Blueberry Cream Cheese, Cheesy Walnut, Maple Pecan, Cinnamon Sugar, Beef Pepperoni Mozzarella, and More!",
  },
];

export default function MenuSection() {
  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-10">
        <div className="space-y-6">
          {menuSections.map((section, index) => (
            <article
              key={`${section.title}-${index}`}
              className="rounded-2xl border border-primary/15 bg-background p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-dark">
                {section.title}
              </h3>
              <div className="mt-4 space-y-2">
                {section.items.map((item, itemIndex) => (
                  <div
                    key={`${item.name}-${itemIndex}`}
                    className="flex items-center justify-between border-b border-primary/15 py-3 last:border-b-0"
                  >
                    <p className="text-sm font-medium italic text-dark">
                      {item.name}
                    </p>
                    <p className="text-sm font-semibold text-primary">
                      {item.price}
                    </p>
                  </div>
                ))}
              </div>
              {section.flavors && (
                <div className="mt-4 rounded-2xl border border-primary/20 bg-bg-creamy/70 px-4 py-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-secondary">
                    Flavours
                  </p>
                  <p className="mt-2 text-xs leading-5 text-taupe-brown">
                    {section.flavors}
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

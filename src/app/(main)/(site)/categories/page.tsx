import Categories from "@/components/main/categories/list";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Categories",
  description:
    "Explore Cozy Bakes Inc. product categories — from sourdough breads and bagels to cookies and gourmet gift baskets.",
  alternates: { canonical: "/categories" },
};

function CategoriesPage() {
  return <Categories />;
}

export default CategoriesPage;

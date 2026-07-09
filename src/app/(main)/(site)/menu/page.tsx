import Menu from "@/components/main/menu";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Menu",
  description:
    "Browse the full Cozy Bakes Inc. menu — handcrafted sourdough breads, bagels, cookies, and sweet treats made fresh by Marwa.",
  alternates: { canonical: "/menu" },
};

function MenuPage() {
  return (
    <>
      <Menu />
    </>
  );
}

export default MenuPage;

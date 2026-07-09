import FarmersMarket from "@/components/main/farmers-market";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Farmers Markets",
  description:
    "Find out where to catch Cozy Bakes Inc. in person — upcoming farmers market dates and locations around Minneapolis/St. Paul.",
  alternates: { canonical: "/farmers-market" },
};

function FarmersMarketPage() {
  return (
    <>
      <FarmersMarket />
    </>
  );
}

export default FarmersMarketPage;

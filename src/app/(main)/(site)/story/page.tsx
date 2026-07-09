import Story from "@/components/main/story";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Meet Marwa, the baker behind Cozy Bakes Inc., and learn how artisan baking became a Minneapolis/St. Paul cottage bakery.",
  alternates: { canonical: "/story" },
};

function StoryPage() {
  return (
    <>
      <Story />
    </>
  );
}

export default StoryPage;

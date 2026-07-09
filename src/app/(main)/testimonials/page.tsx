import TestimonialsSection from "@/layout/main/site/testimonials-section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "See what customers are saying about Cozy Bakes Inc.'s handcrafted breads, bagels, cookies, and sweet treats.",
  alternates: { canonical: "/testimonials" },
};

function TestimonialsPage() {
  return <TestimonialsSection previewOnly={false} />;
}

export default TestimonialsPage;

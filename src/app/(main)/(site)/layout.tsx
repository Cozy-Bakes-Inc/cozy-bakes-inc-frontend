import QuestionsSection from "@/layout/main/site/questions-section";
import TestimonialsSection from "@/layout/main/site/testimonials-section";
import type { ReactNode } from "react";

type MainLayoutProps = {
  children: ReactNode;
};

function SiteLayout({ children }: MainLayoutProps) {
  return (
    <>
      <main>{children}</main>
      <QuestionsSection />
      <TestimonialsSection />
    </>
  );
}

export default SiteLayout;

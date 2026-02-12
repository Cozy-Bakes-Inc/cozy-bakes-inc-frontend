import type { ReactNode } from "react";
import QuestionsSection from "@/components/layout/main/site/questions-section";
import TestimonialsSection from "@/components/layout/main/site/testimonials-section";

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

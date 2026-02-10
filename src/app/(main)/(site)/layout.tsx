import type { ReactNode } from "react";
import QuestionsSection from "@/components/questions-section";
import TestimonialsSection from "@/components/testimonials-section";

type MainLayoutProps = {
  children: ReactNode;
};

function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <main>{children}</main>
      <QuestionsSection />
      <TestimonialsSection />
    </>
  );
}

export default MainLayout;

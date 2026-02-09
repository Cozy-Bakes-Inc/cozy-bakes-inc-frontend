import QuestionsSection from "../../home/questions-section";
import TestimonialsSection from "../../home/testimonials-section";
import BakeryTreatsSection from "./bakery-treats-section";
import CategoriesGridSection from "./categories-grid-section";
import CategoriesHeroSection from "./categories-hero-section";


function Categories() {
  return (
    <>
      <CategoriesHeroSection />
      <CategoriesGridSection />
      <BakeryTreatsSection />
      <QuestionsSection />
      <TestimonialsSection />
    </>
  );
}

export default Categories;

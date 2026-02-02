import HeroVideoSlider from "./hero";
import CategoriesSection from "./categories-section";
import MarketSection from "./market-section";
import SelectionSection from "./selection-section";
import StorySection from "./story-section";
import QuestionsSection from "./questions-section";
import TestimonialsSection from "./testimonials-section";

function Home() {
  return (
    <>
      <HeroVideoSlider />
      <MarketSection />
      <SelectionSection />
      <CategoriesSection />
      <StorySection />
      <QuestionsSection />
      <TestimonialsSection />
    </>
  );
}

export default Home;

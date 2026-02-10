import HeroVideoSlider from "./hero";
import CategoriesSection from "./categories-section";
import MarketSection from "./market-section";
import SelectionSection from "./selection-section";
import StorySection from "./story-section";

function Home() {
  return (
    <>
      <HeroVideoSlider />
      <MarketSection />
      <SelectionSection />
      <CategoriesSection />
      <StorySection />
    </>
  );
}

export default Home;

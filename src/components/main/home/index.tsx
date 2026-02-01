import HeroVideoSlider from "./hero";
import CategoriesSection from "./categories-section";
import MarketSection from "./market-section";
import SelectionSection from "./selection-section";

function Home() {
  return (
    <>
      <HeroVideoSlider />
      <MarketSection />
      <SelectionSection />
      <CategoriesSection />
    </>
  );
}

export default Home;

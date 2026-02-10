import FarmersMarketDays from "./farmers-market-days";
import FarmersMarketHero from "./farmers-market-hero";
import TodayFarmersMarket from "./today-farmers-market";

function FarmersMarket() {
  return (
    <>
      <FarmersMarketHero />
      <TodayFarmersMarket />
      <FarmersMarketDays />
    </>
  );
}

export default FarmersMarket;

import HeroSection from "@/components/ui/hero-section";

export default function FarmersMarketHero() {
  return (
    <HeroSection
      badge="Reach Out Weakly Presence"
      title="Freshly Baked , Locally Found"
      description="We bring the warmth of our oven to local squares across the city. Come say hello and taste the season's best."
      image={{
        src: "/images/our-categories.png",
        alt: "Fresh bakery products",
      }}
    />
  );
}

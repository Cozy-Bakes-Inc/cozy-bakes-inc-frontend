import HeroSection from "@/components/ui/hero-section";

export default function FarmersMarketHero() {
  return (
    <HeroSection
      badge="Reach Out Weakly Presence"
      title="Fresh Baked & Locally Found "
      description="We bring the warmth of our ovens to local markets across the Twin Cities. Stop by to visit and taste the season’s best."
      image={{
        src: "/images/logo-hero-section.png",
        alt: "Cozy Bakes Inc",
      }}
    />
  );
}

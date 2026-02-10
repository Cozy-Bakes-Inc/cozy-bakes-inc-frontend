import HeroSection from "@/components/ui/hero-section";

export default function MenuHero() {
  return (
    <HeroSection
      badge="Explore Our"
      title="Our Freshly Baked Selection"
      description="Our menu features a fresh selection of handcrafted baked goods, made daily using natural ingredients and time-honored recipes."
      image={{
        src: "/images/our-categories.png",
        alt: "Fresh bakery products",
      }}
    />
  );
}

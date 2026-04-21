import HeroSection from "@/components/ui/hero-section";

export default function CategoryHeroSection() {
  return (
    <HeroSection
      badge="Explore Our"
      title="Breads"
      description="Artisan sourdough, rustic baguettes, and handcrafted loaves baked fresh daily with premium organic flour."
      image={{
        src: "/images/logo-hero-section.png",
        alt: "Cozy Bakes Inc",
      }}
    />
  );
}

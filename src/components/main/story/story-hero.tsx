import HeroSection from "@/components/ui/hero-section";

export default function StoryHero() {
  return (
    <HeroSection
      badge="Explore Our"
      title="Story & Passion for Baking"
      description="A journey of love, tradition, and dedication to crafting the finest handmade baked goods with fresh, natural ingredients."
      image={{
        src: "/images/logo-hero-section.png",
        alt: "Cozy Bakes Inc",
      }}
    />
  );
}

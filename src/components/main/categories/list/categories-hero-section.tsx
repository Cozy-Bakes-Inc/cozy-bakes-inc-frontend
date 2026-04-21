import HeroSection from "@/components/ui/hero-section";

export default function CategoriesHeroSection() {
  return (
    <HeroSection
      badge="Explore Our"
      title="Handcrafted Delights"
      description="Browse our handcrafted selection of breads, pastries, cakes, cookies, and more to find your perfect every day treat."
      image={{
        src: "/images/logo-hero-section.png",
        alt: "Cozy Bakes Inc",
      }}
    />
  );
}

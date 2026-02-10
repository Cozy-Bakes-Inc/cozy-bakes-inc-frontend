import HeroSection from "@/components/ui/hero-section";

export default function ContactHero() {
  return (
    <HeroSection
      badge="Reach Out Anytime!"
      title="Can’t Wait to Hear From You!"
      description="Whether it’s about our market days, custom orders, or freshly baked goods,reach out and we’ll get back to you"
      image={{
        src: "/images/our-categories.png",
        alt: "Fresh bakery products",
      }}
    />
  );
}

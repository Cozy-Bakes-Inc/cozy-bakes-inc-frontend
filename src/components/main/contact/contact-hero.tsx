import HeroSection from "@/components/ui/hero-section";

export default function ContactHero() {
  return (
    <HeroSection
      badge="Reach Out Anytime!"
      title="We can’t wait to hear from you!"
      description="Whether it’s about our market days, customer orders, or freshly baked goods, reach out and we’ll be happy to help you!"
      image={{
        src: "/images/our-categories.png",
        alt: "Fresh bakery products",
      }}
    />
  );
}

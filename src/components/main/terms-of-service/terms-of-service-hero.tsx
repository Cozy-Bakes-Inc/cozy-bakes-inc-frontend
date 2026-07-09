import HeroSection from "@/components/ui/hero-section";

export default function TermsOfServiceHero() {
  return (
    <HeroSection
      badge="Please Read Carefully"
      title="Terms of Service"
      description="These terms govern your use of the Cozy Bakes Inc. website and outline the rules for ordering, delivery, and account use."
      image={{
        src: "/images/logo.png",
        alt: "Cozy Bakes Inc",
      }}
    />
  );
}

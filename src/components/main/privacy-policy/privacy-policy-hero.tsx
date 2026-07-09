import HeroSection from "@/components/ui/hero-section";

export default function PrivacyPolicyHero() {
  return (
    <HeroSection
      badge="Your Trust Matters"
      title="Privacy Policy"
      description="Learn how Cozy Bakes Inc. collects, uses, and protects your personal information when you visit our website and place an order."
      image={{
        src: "/images/logo.png",
        alt: "Cozy Bakes Inc",
      }}
    />
  );
}

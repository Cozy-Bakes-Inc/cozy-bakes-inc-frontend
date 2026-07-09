import PrivacyPolicy from "@/components/main/privacy-policy";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Read the Cozy Bakes Inc. privacy policy.",
  alternates: { canonical: "/privacy-policy" },
};

function PrivacyPolicyPage() {
  return (
    <>
      <PrivacyPolicy />
    </>
  );
}

export default PrivacyPolicyPage;

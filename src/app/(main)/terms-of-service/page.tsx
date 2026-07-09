import TermsOfService from "@/components/main/terms-of-service";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Read the Cozy Bakes Inc. terms of service.",
  alternates: { canonical: "/terms-of-service" },
};

function TermsOfServicePage() {
  return (
    <>
      <TermsOfService />
    </>
  );
}

export default TermsOfServicePage;

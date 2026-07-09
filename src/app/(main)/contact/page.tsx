import Contact from "@/components/main/contact";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Cozy Bakes Inc. to place an order, ask about custom gift baskets, or find out which farmers markets we're at next.",
  alternates: { canonical: "/contact" },
};

function ContactPage() {
  return (
    <>
      <Contact />
    </>
  );
}

export default ContactPage;

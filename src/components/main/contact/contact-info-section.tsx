"use client";

import { useContact } from "@/hooks";
import { Shimmer } from "@/components/ui/shimmer";
import { contactCards } from "@/data";

export default function ContactInfoSection() {
  const { data, isLoading } = useContact();
  const contactSection = data?.data?.contact_section;

  const contactDetails = {
    email: {
      detail: contactSection?.contact_email ?? "",
      href: contactSection?.contact_email
        ? `mailto:${contactSection.contact_email}`
        : undefined,
    },
    location: {
      detail: contactSection?.location ?? "",
      href: undefined,
    },
    phone: {
      detail: contactSection?.phone_number ?? "",
      href: contactSection?.phone_number
        ? `tel:${contactSection.phone_number.replace(/\D/g, "")}`
        : undefined,
    },
  };

  return (
    <section className="bg-background pb-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-10">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {contactCards.map((card) => {
            const contactDetail =
              contactDetails[card.key as keyof typeof contactDetails];

            return (
              <div
                key={card.title}
                className="relative flex h-full flex-col gap-6 rounded-2xl bg-bg-creamy p-6 shadow-[0_4px_4px_rgba(201,165,90,0.1)]"
              >
                <div className="flex size-12 items-center justify-center rounded-lg bg-primary text-white">
                  <card.Icon className="size-5" />
                </div>
                <div className="space-y-2">
                  <p className="text-lg font-semibold text-primary">
                    {card.title}
                  </p>
                  <p className="text-sm text-gray-500">{card.description}</p>
                </div>
                {isLoading ? (
                  <Shimmer className="h-5 w-44 rounded-md bg-white/70" />
                ) : contactDetail.href ? (
                  <a
                    href={contactDetail.href}
                    className="text-sm font-semibold text-dark transition-colors hover:text-primary"
                  >
                    {contactDetail.detail}
                  </a>
                ) : (
                  <p className="text-sm font-semibold text-dark">
                    {contactDetail.detail}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

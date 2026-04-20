import { Mail, MapPin, Phone } from "lucide-react";

const contactCards = [
  {
    title: "Email us",
    description: "Speak to our friendly team.",
    detail: "marwa@cozybakesinc.com",
    href: "mailto:marwa@cozybakesinc.com",
    Icon: Mail,
  },
  {
    title: "Visit us",
    description: "See our weekly market schedule.",
    detail: "",
    Icon: MapPin,
  },
  {
    title: "Text us anytime",
    description:
      "Reach out anytime with your order questions or sweet cravings.",
    detail: "+1 (612) 227-6186",
    href: "tel:+16122276186",
    Icon: Phone,
  },
];

export default function ContactInfoSection() {
  return (
    <section className="bg-background pb-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-10">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {contactCards.map((card) => (
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
              {card.href ? (
                <a
                  href={card.href}
                  className="text-sm font-semibold text-dark transition-colors hover:text-primary"
                >
                  {card.detail}
                </a>
              ) : (
                <p className="text-sm font-semibold text-dark">{card.detail}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

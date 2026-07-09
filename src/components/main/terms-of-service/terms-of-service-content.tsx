import { termsOfServiceSections } from "@/data";

export default function TermsOfServiceContent() {
  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-4xl px-5 sm:px-10">
        <div className="space-y-6">
          {termsOfServiceSections.map((section) => (
            <div
              key={section.title}
              className="rounded-2xl border border-primary/10 bg-bg-creamy p-6 shadow-sm sm:p-8"
            >
              <div className="flex items-center gap-3">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <section.Icon className="size-5 shrink-0" />
                </div>
                <h2 className="text-lg font-semibold text-dark sm:text-xl">
                  {section.title}
                </h2>
              </div>

              <div className="mt-4 space-y-3">
                {section.paragraphs.map((paragraph, index) => (
                  <p key={index} className="text-sm leading-6 text-gray">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

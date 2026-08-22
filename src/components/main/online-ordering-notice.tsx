import { CalendarDays } from "lucide-react";

type OnlineOrderingNoticeProps = {
  fullPage?: boolean;
};

export default function OnlineOrderingNotice({ fullPage = false }: OnlineOrderingNoticeProps) {
  if (fullPage) {
    return (
      <main className="grid min-h-[55vh] place-items-center px-4 py-16">
        <section className="w-full max-w-2xl rounded-3xl border border-primary/20 bg-bg-creamy p-8 text-center shadow-sm sm:p-12">
          <CalendarDays className="mx-auto mb-5 size-10 text-primary" />
          <h1 className="text-2xl font-semibold text-dark sm:text-4xl">
            Online ordering available in October 2026
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-gray sm:text-base">
            We are not accepting online orders yet. Please check back in October 2026.
          </p>
        </section>
      </main>
    );
  }

  return (
    <aside className="bg-primary px-4 py-2.5 text-center text-sm font-semibold text-white sm:text-base" role="status">
      Online ordering available in October 2026
    </aside>
  );
}

import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";

export default function QuestionsSection() {
  return (
    <section className="relative">
      <div className="relative overflow-hidden bg-chocolate">
        <div className="absolute inset-0 bg-[url('/images/questions.png')] bg-size-[100%_100%]  bg-center bg-no-repeat" />
        <div className="absolute inset-0 bg-linear-to-r from-black/75 via-black/45 to-black/70" />

        <div className="relative mx-auto max-w-7xl px-5 py-20 text-center text-white sm:px-10">
          <h2 className="animate-in fade-in slide-in-from-bottom-4 text-2xl font-extrabold tracking-tight sm:text-3xl md:text-4xl">
            We&apos;re Here to,{" "}
            <span className="text-card">Answer Your Questions</span>
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-sm text-white/85 sm:text-base animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
            Have a question or a special order? Our team is here to help you
            craft the perfect baked delights.
          </p>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-white/70 sm:text-base animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            Contact us today and let&apos;s make your bakery experience
            exceptional.
          </p>
          <div className="mt-6 flex justify-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            <Button className="h-10 rounded-full bg-card px-6 text-xs font-semibold text-white hover:bg-card/90 sm:h-11 sm:px-8 sm:text-sm flex gap-2 items-center justify-center">
              <span>Inquire or Order Now</span> <MoveRight />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

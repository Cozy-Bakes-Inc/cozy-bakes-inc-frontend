import Image from "next/image";
import { PhoneCall } from "lucide-react";

export default function ContactFormSection() {
  return (
    <section className="bg-background py-20">
      <div className="mx-auto flex max-w-7xl flex-col gap-14 px-5 sm:px-10">
        <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-4 py-2 text-xs font-semibold text-primary">
            <PhoneCall className="size-5 shrink-0" />
            <span> Contact Us</span>
          </div>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-dark sm:text-4xl">
            We’d love to, <span className="text-heading-2">hear from you</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-gray sm:text-base">
            Have a question or special request? We&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="relative min-h-90 overflow-hidden rounded-2xl sm:min-h-130 lg:min-h-166">
            <Image
              src="/images/story-1.png"
              alt="Assorted baked goods"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>

          <div className="flex h-full flex-col gap-6 rounded-2xl border border-[rgba(201,165,90,0.2)] bg-[#faf8f3] p-8">
            <h3 className="text-center text-xl font-medium text-[#3d2c1e]">
              Send Us a Message
            </h3>
            <form className="flex flex-1 flex-col gap-4">
              <label className="flex flex-col gap-2 text-sm text-[#344054]">
                Your Name
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  className="h-12 rounded-[10px] border border-[rgba(201,165,90,0.2)] bg-[#fcfcfd] px-4 text-sm text-[#344054] placeholder:text-[#d0d5dd] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d19628]/30"
                />
              </label>

              <label className="flex flex-col gap-2 text-sm text-[#344054]">
                Email Address
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className="h-12 rounded-[10px] border border-[rgba(201,165,90,0.2)] bg-[#fcfcfd] px-4 text-sm text-[#344054] placeholder:text-[#d0d5dd] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d19628]/30"
                />
              </label>

              <label className="flex flex-col gap-2 text-sm text-[#344054]">
                Subject
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  className="h-12 rounded-[10px] border border-[rgba(201,165,90,0.2)] bg-[#fcfcfd] px-4 text-sm text-[#344054] placeholder:text-[#d0d5dd] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d19628]/30"
                />
              </label>

              <label className="flex flex-col gap-2 text-sm text-[#344054]">
                Message
                <textarea
                  name="message"
                  placeholder="Your Message"
                  className="min-h-36.5 resize-none rounded-[10px] border border-[rgba(201,165,90,0.2)] bg-[#fcfcfd] px-4 py-3 text-sm text-[#344054] placeholder:text-[#d0d5dd] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d19628]/30"
                />
              </label>

              <button
                type="submit"
                className="mt-2 h-12 rounded-lg bg-[#d19628] text-sm font-semibold text-white shadow-[0_1px_2px_rgba(16,24,40,0.05)] transition hover:bg-[#c28722]"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

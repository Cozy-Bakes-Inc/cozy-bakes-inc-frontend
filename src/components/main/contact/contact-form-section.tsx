"use client";

import Image from "next/image";
import { PhoneCall } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import InputErrorMessage from "@/components/ui/input-error-message";
import Loader from "@/components/ui/loader";
import { contactSchema, type ContactSchemaValues } from "@/schemas/main";
import { contactAPI } from "@/services/mutations";

export default function ContactFormSection() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactSchemaValues>({
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactSchemaValues) => {
    const result = await contactAPI(data);

    if (result?.ok) {
      toast.success(result?.message || "Message sent successfully");
      reset();
      return;
    }

    toast.error(result?.message || "Failed to send message");
  };

  return (
    <section className="bg-background py-20">
      <div className="mx-auto flex max-w-7xl flex-col gap-14 px-5 sm:px-10">
        <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-4 py-2 text-xs font-semibold text-primary">
            <PhoneCall className="size-5 shrink-0" />
            <span> Contact Us</span>
          </div>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-dark sm:text-4xl">
            We’d love to <span className="text-heading-2">hear from you</span>
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

          <div className="flex h-full flex-col gap-6 rounded-2xl border border-primary/2 bg-bg-creamy p-8">
            <h3 className="text-center text-xl font-medium text-chocolate">
              Send Us a Message
            </h3>
            <form
              className="flex flex-1 flex-col gap-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="text-sm text-dark">
                <label htmlFor="contact-name" className="mb-2 block">
                  Your Name
                </label>
                <input
                  {...register("name", {
                    validate: (value) => {
                      const result = contactSchema.shape.name.safeParse(value);
                      return result.success || result.error.issues[0]?.message;
                    },
                  })}
                  id="contact-name"
                  type="text"
                  placeholder="Your Name"
                  className="h-12 w-full rounded-[10px] border border-primary/2 bg-background px-4 text-sm text-dark placeholder:text-[#d0d5dd] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                />
                <InputErrorMessage msg={errors.name?.message} />
              </div>

              <div className="text-sm text-dark">
                <label htmlFor="contact-email" className="mb-2 block">
                  Email Address
                </label>
                <input
                  {...register("email", {
                    validate: (value) => {
                      const result = contactSchema.shape.email.safeParse(value);
                      return result.success || result.error.issues[0]?.message;
                    },
                  })}
                  id="contact-email"
                  type="email"
                  placeholder="Email Address"
                  className="h-12 w-full rounded-[10px] border border-primary/2 bg-background px-4 text-sm text-dark placeholder:text-[#d0d5dd] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                />
                <InputErrorMessage msg={errors.email?.message} />
              </div>

              <div className="text-sm text-dark">
                <label htmlFor="contact-subject" className="mb-2 block">
                  Subject
                </label>
                <input
                  {...register("subject", {
                    validate: (value) => {
                      const result =
                        contactSchema.shape.subject.safeParse(value);
                      return result.success || result.error.issues[0]?.message;
                    },
                  })}
                  id="contact-subject"
                  type="text"
                  placeholder="Subject"
                  className="h-12 w-full rounded-[10px] border border-primary/2 bg-background px-4 text-sm text-dark placeholder:text-[#d0d5dd] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                />
                <InputErrorMessage msg={errors.subject?.message} />
              </div>

              <div className="text-sm text-dark">
                <label htmlFor="contact-message" className="mb-2 block">
                  Message
                </label>
                <textarea
                  {...register("message", {
                    validate: (value) => {
                      const result =
                        contactSchema.shape.message.safeParse(value);
                      return result.success || result.error.issues[0]?.message;
                    },
                  })}
                  id="contact-message"
                  placeholder="Your Message"
                  className="min-h-36.5 w-full resize-none rounded-[10px] border border-primary/2 bg-background px-4 py-3 text-sm text-dark placeholder:text-[#d0d5dd] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                />
                <InputErrorMessage msg={errors.message?.message} />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 h-12 rounded-lg bg-primary text-sm font-semibold text-white shadow-[0_1px_2px_rgba(16,24,40,0.05)] transition hover:bg-[#c28722]"
              >
                {isSubmitting ? <Loader /> : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

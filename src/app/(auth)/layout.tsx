"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

type AuthLayoutProps = {
  children: React.ReactNode;
};

const imageByRoute: Record<string, string> = {
  "/login": "/images/artisan-sourdough.jpg",
  "/sign-up": "/images/artisan-sourdough.jpg",
  "/forgot-password": "/images/cinnamon-rolls.jpg",
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  const pathname = usePathname();
  const imageSrc = imageByRoute[pathname] ?? "/images/artisan-sourdough.jpg";

  return (
    <main className="min-h-svh">
      <section className="mx-auto max-w-360 rounded-[24px] bg-background p-2 sm:p-3">
        <div className="grid gap-2 md:grid-cols-2">
          <div className="rounded-[18px] bg-background px-4 py-4 sm:px-8 sm:py-6">
            <div className="mb-6 flex items-center gap-2">
              <Image
                src="/images/logo.svg"
                alt="Cozy Bakes Inc."
                width={34}
                height={34}
                className="h-8.5 w-8.5"
              />
              <div className="leading-tight">
                <p className="text-sm font-semibold text-[#7B3306]">
                  Cozy Bakes Inc.
                </p>
                <p className="text-[11px] text-[#BB4D00]">By Marwa</p>
              </div>
            </div>

            <div className="mx-auto w-full max-w-105">{children}</div>
          </div>

          <div className="relative min-h-80 overflow-hidden rounded-[18px] md:min-h-190">
            <Image
              src={imageSrc}
              alt="Cozy bakes auth visual"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

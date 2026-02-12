"use client";

import { AUTH_IMAGE, FORGOT_PASSWORD_IMAGE } from "@/constants";
import { authRoutes, forgotPasswordFlowRoutes } from "@/data";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { type ReactNode } from "react";

interface AuthLayoutContentProps {
  children: ReactNode;
}

function getAuthImageByPathname(pathname: string) {
  if (forgotPasswordFlowRoutes.some((route) => pathname.startsWith(route))) {
    return FORGOT_PASSWORD_IMAGE;
  }

  if (pathname.startsWith("/new-password")) {
    return "/images/verify-otp.png";
  }

  return AUTH_IMAGE;
}

export function AuthLayoutContent({ children }: AuthLayoutContentProps) {
  const pathname = usePathname();
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  const imageSrc = isAuthRoute ? AUTH_IMAGE : getAuthImageByPathname(pathname);

  return (
    <main className="min-h-svh">
      <section className="mx-auto max-w-360 rounded-[24px] bg-background p-2 sm:p-3">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="rounded-[18px] px-4 py-4 sm:px-8 sm:py-6">
            <div className="mb-6 flex items-center gap-2">
              <div className="relative h-17.5 w-17.5 shrink-0">
                <Image src="/images/logo.svg" alt="Cozy Bakes Inc." fill />
              </div>
              <div className="leading-tight">
                <p className="text-lg font-bold text-[#7B3306]">
                  Cozy Bakes Inc.
                </p>
                <p className="text-xs font-medium text-[#BB4D00]">By Marwa</p>
              </div>
            </div>

            <div className="mx-auto w-full max-w-xl">{children}</div>
          </div>

          <div className="relative h-[calc(100svh-16px)] overflow-hidden rounded-[18px] sm:h-[calc(100svh-24px)]">
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

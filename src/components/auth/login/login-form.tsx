"use client";

import Link from "next/link";
import { type FormEvent, useState } from "react";
import { EmailField } from "./components/email-field";
import { PasswordField } from "./components/password-field";
import { RememberMeRow } from "./components/remember-me-row";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form className="w-full space-y-5" onSubmit={handleSubmit}>
      <EmailField email={email} onEmailChange={setEmail} />
      <PasswordField
        password={password}
        showPassword={showPassword}
        onPasswordChange={setPassword}
        onToggleShowPassword={() => setShowPassword((value) => !value)}
      />
      <RememberMeRow
        rememberMe={rememberMe}
        onRememberMeChange={setRememberMe}
      />

      <Button
        type="submit"
        className="h-13.75 w-full rounded-2xl bg-primary px-8 text-[18px] font-medium text-white"
      >
        Login
      </Button>

      <div className="flex items-center justify-center gap-2.5">
        <span className="h-px flex-1 bg-[#D0D5DD]" />
        <span className="text-[#667085] text-sm leading-7 font-semibold uppercase">
          OR
        </span>
        <span className="h-px flex-1 bg-[#D0D5DD]" />
      </div>

      <Button
        type="button"
        variant="ghost"
        className="flex h-13.5 w-full rounded-2xl border border-[#667085] items-center justify-center gap-3"
      >
        <div className="relative size-6">
          <Image src="/images/google.svg" alt="Google" fill />
        </div>
        <span className="text-dark text-base leading-6 font-medium">
          Continue with Google
        </span>
      </Button>

      <div className="flex flex-wrap items-center justify-center gap-x-1 gap-y-1 text-center">
        <p className="text-[#667085] text-sm leading-6 font-medium md:text-base">
          Don&apos;t Have Account ?
        </p>
        <Link
          href="/sign-up"
          className="text-primary text-sm leading-7 font-semibold border-b border-primary whitespace-nowrap md:text-base"
        >
          Create New Account
        </Link>
      </div>
    </form>
  );
}

"use client";

import Link from "next/link";
import { type FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { NameFieldsRow } from "./components/name-fields-row";
import { SignUpEmailField } from "./components/sign-up-email-field";
import { SignUpPasswordField } from "./components/sign-up-password-field";
import Image from "next/image";

export function SignUpForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form className="w-full space-y-5" onSubmit={handleSubmit}>
      <NameFieldsRow
        firstName={firstName}
        lastName={lastName}
        onFirstNameChange={setFirstName}
        onLastNameChange={setLastName}
      />

      <SignUpEmailField email={email} onEmailChange={setEmail} />

      <SignUpPasswordField
        label="Password"
        placeholder="Password"
        value={password}
        showPassword={showPassword}
        onValueChange={setPassword}
        onToggleShowPassword={() => setShowPassword((value) => !value)}
      />

      <SignUpPasswordField
        label="Confirm New Password"
        placeholder="Confirm Password"
        value={confirmPassword}
        showPassword={showConfirmPassword}
        onValueChange={setConfirmPassword}
        onToggleShowPassword={() => setShowConfirmPassword((value) => !value)}
      />

      <Button
        type="submit"
        className="h-13.75 w-full rounded-2xl bg-primary px-8 text-[18px] font-medium text-white"
      >
        Create Account
      </Button>

      <div className="flex items-center justify-center gap-2.5">
        <span className="h-px flex-1 bg-[#D0D5DD]" />
        <span className="text-sm leading-7 font-semibold text-[#667085] uppercase">
          OR
        </span>
        <span className="h-px flex-1 bg-[#D0D5DD]" />
      </div>

      <Button
        type="button"
        variant="ghost"
        className="flex h-13.5 w-full items-center justify-center gap-3 rounded-2xl border border-[#667085]"
      >
        <div className="relative size-6">
          <Image src="/images/google.svg" alt="Google" fill />
        </div>
        <span className="text-base leading-6 font-medium text-dark">
          Continue with Google
        </span>
      </Button>

      <div className="flex items-center justify-center gap-1">
        <p className="text-center text-base leading-6 font-medium text-[#667085]">
          Already have an account?
        </p>
        <Link
          href="/login"
          className="border-b border-primary text-base leading-7 font-semibold text-primary"
        >
          Login
        </Link>
      </div>
    </form>
  );
}

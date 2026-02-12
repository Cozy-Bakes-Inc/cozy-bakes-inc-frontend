"use client";

import { SignUpIntro } from "./components/sign-up-intro";
import { SignUpForm } from "./sign-up-form";

export default function SignUp() {
  return (
    <section className="content-stretch flex flex-col items-start justify-center gap-8 py-2">
      <SignUpIntro />
      <SignUpForm />
    </section>
  );
}

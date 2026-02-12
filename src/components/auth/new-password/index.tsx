"use client";

import { NewPasswordIntro } from "./components/new-password-intro";
import { NewPasswordForm } from "./new-password-form";

export default function NewPassword() {
  return (
    <section className="content-stretch flex flex-col items-start justify-center gap-8 py-2">
      <NewPasswordIntro />
      <NewPasswordForm />
    </section>
  );
}

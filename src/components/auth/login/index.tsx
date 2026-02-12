"use client";

import { LoginForm } from "./login-form";
import { LoginIntro } from "./components/login-intro";

export default function Login() {
  return (
    <section className="content-stretch flex flex-col gap-8 items-start justify-center py-2">
      <LoginIntro />
      <LoginForm />
    </section>
  );
}

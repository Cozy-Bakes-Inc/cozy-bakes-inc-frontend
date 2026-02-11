"use client";

import Link from "next/link";
import { Eye, LockKeyhole, Mail, UserRound } from "lucide-react";

export default function SignUpPage() {
  return (
    <div className="pt-2 sm:pt-10">
      <h1 className="text-[30px] leading-[38px] font-semibold text-dark">
        Create a <span className="text-primary">new account</span>
      </h1>
      <p className="mt-2 text-base leading-6 text-[#667085]">
        Join Cozy Bakes and enjoy handcrafted pastries and breads made with love.
      </p>

      <form className="mt-6 space-y-3">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-dark">First Name</label>
            <div className="flex h-11 items-center gap-2 rounded-[10px] border border-primary/30 px-3">
              <UserRound className="size-4 text-primary/70" />
              <input
                type="text"
                placeholder="First name"
                className="w-full bg-transparent text-sm text-dark placeholder:text-[#98A2B3] outline-none"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-dark">Last Name</label>
            <div className="flex h-11 items-center gap-2 rounded-[10px] border border-primary/30 px-3">
              <UserRound className="size-4 text-primary/70" />
              <input
                type="text"
                placeholder="Last name"
                className="w-full bg-transparent text-sm text-dark placeholder:text-[#98A2B3] outline-none"
              />
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-dark">Email</label>
          <div className="flex h-11 items-center gap-2 rounded-[10px] border border-primary/50 px-3">
            <Mail className="size-4 text-primary" />
            <input
              type="email"
              placeholder="Cozy Bakes@gmail.com"
              className="w-full bg-transparent text-sm text-dark placeholder:text-[#98A2B3] outline-none"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-dark">Password</label>
          <div className="flex h-11 items-center gap-2 rounded-[10px] border border-primary/30 px-3">
            <LockKeyhole className="size-4 text-primary/70" />
            <input
              type="password"
              placeholder="Password"
              className="w-full bg-transparent text-sm text-dark placeholder:text-[#98A2B3] outline-none"
            />
            <Eye className="size-4 text-primary/70" />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-dark">Confirm Password</label>
          <div className="flex h-11 items-center gap-2 rounded-[10px] border border-primary/30 px-3">
            <LockKeyhole className="size-4 text-primary/70" />
            <input
              type="password"
              placeholder="Confirm password"
              className="w-full bg-transparent text-sm text-dark placeholder:text-[#98A2B3] outline-none"
            />
            <Eye className="size-4 text-primary/70" />
          </div>
        </div>

        <button
          type="submit"
          className="h-[50px] w-full rounded-[10px] bg-primary text-base font-medium text-white"
        >
          Create new account
        </button>

        <p className="pt-1 text-center text-sm text-[#667085]">
          Already Have Account ?{" "}
          <Link href="/login" className="font-semibold text-primary">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

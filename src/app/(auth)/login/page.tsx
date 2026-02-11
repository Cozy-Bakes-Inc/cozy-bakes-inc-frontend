"use client";

import Link from "next/link";
import { Eye, LockKeyhole, Mail } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="pt-2 sm:pt-10">
      <h1 className="text-[30px] leading-[38px] font-semibold text-dark">
        Welcome back to <span className="text-primary">cozy bakes inc.</span>
      </h1>
      <p className="mt-2 text-base leading-6 text-[#667085]">
        Your cozy favorites are ready. Sign in and enjoy freshly baked goodness,
        made to warm every moment.
      </p>

      <form className="mt-6 space-y-3">
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

        <div className="flex items-center justify-between pt-1 text-sm">
          <label className="flex items-center gap-2 text-[#667085]">
            <input type="checkbox" className="accent-primary" defaultChecked />
            Remember me
          </label>
          <Link href="/forgot-password" className="text-dark hover:text-primary">
            Forget Password ?
          </Link>
        </div>

        <button
          type="submit"
          className="h-[50px] w-full rounded-[10px] bg-primary text-base font-medium text-white"
        >
          Login
        </button>

        <div className="flex items-center gap-3 py-2">
          <span className="h-px flex-1 bg-[#EAECF0]" />
          <span className="text-xs font-semibold text-[#98A2B3]">OR</span>
          <span className="h-px flex-1 bg-[#EAECF0]" />
        </div>

        <button
          type="button"
          className="flex h-[44px] w-full items-center justify-center gap-2 rounded-[10px] border border-[#D0D5DD] text-sm font-medium text-dark"
        >
          <span className="text-base">G</span>
          Log in with Google
        </button>

        <p className="pt-1 text-center text-sm text-[#667085]">
          Dont Have Account ?{" "}
          <Link href="/sign-up" className="font-semibold text-primary">
            Create New Account
          </Link>
        </p>
      </form>
    </div>
  );
}


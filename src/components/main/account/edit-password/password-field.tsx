"use client";

import { Eye, EyeOff, LockKeyhole } from "lucide-react";
import type { UseFormRegisterReturn } from "react-hook-form";
import InputErrorMessage from "@/components/ui/input-error-message";

type PasswordFieldProps = {
  label: string;
  placeholder: string;
  register: UseFormRegisterReturn<
    "old_password" | "new_password" | "new_password_confirmation"
  >;
  errorMessage?: string;
  showPassword: boolean;
  onToggleShowPassword: () => void;
};

export function PasswordField({
  label,
  placeholder,
  register,
  errorMessage,
  showPassword,
  onToggleShowPassword,
}: PasswordFieldProps) {
  const Icon = showPassword ? EyeOff : Eye;

  return (
    <div>
      <label className="mb-2 block text-base font-medium text-dark">
        {label}
      </label>
      <div className="flex min-h-14 items-center gap-2 rounded-lg border border-gray bg-background px-3">
        <LockKeyhole className="size-5 shrink-0 text-primary" />
        <input
          {...register}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          className="w-full flex-1 bg-transparent text-base font-medium text-dark outline-none placeholder:text-gray"
        />
        <button
          type="button"
          onClick={onToggleShowPassword}
          className="shrink-0 text-primary"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          <Icon className="size-5" />
        </button>
      </div>
      <InputErrorMessage msg={errorMessage} />
    </div>
  );
}

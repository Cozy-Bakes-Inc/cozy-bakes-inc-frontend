"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { EmailField } from "./components/email-field";
import { PasswordField } from "./components/password-field";
import { RememberMeRow } from "./components/remember-me-row";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { loginSchema, type LoginSchemaValues } from "@/schemas/auth/login";
import { loginAPI } from "@/services/mutations";
import toast from "react-hot-toast";
import { setToken } from "@/lib";
import { useRouter } from "next/navigation";
import Loader from "@/components/ui/loader";
import { useQueryClient } from "@tanstack/react-query";

type LoginFormProps = {
  returnTo: string;
};

export function LoginForm({ returnTo }: LoginFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    setValue,
  } = useForm<LoginSchemaValues>({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
  });

  const onSubmit = async (data: LoginSchemaValues) => {
    const result = await loginAPI(data);
    if (result?.ok) {
      toast.success(result?.message || "Login successful");
      const token = result?.data?.data?.token;
      if (token) await setToken(token);
      await queryClient.invalidateQueries({
        queryKey: ["authenticatedUser"],
      });
      router.replace(returnTo);
      return;
    }
    toast.error(result?.message);
  };
  const rememberMe = useWatch({
    control,
    name: "rememberMe",
  });

  return (
    <form className="w-full space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <EmailField
        register={register("email", {
          validate: (value) => {
            const result = loginSchema.shape.email.safeParse(value);
            return result.success || result.error.issues[0]?.message;
          },
        })}
        errorMessage={errors.email?.message}
      />
      <PasswordField
        register={register("password", {
          validate: (value) => {
            const result = loginSchema.shape.password.safeParse(value);
            return result.success || result.error.issues[0]?.message;
          },
        })}
        errorMessage={errors.password?.message}
        showPassword={showPassword}
        onToggleShowPassword={() => setShowPassword((value) => !value)}
      />
      <RememberMeRow
        rememberMe={rememberMe}
        onRememberMeChange={(value) =>
          setValue("rememberMe", value, { shouldValidate: true })
        }
      />

      <Button
        type="submit"
        className="h-13.75 w-full rounded-2xl bg-primary px-8 text-[18px] font-medium text-white"
      >
        {isSubmitting ? <Loader /> : "Login"}
      </Button>

      <div className="flex items-center justify-center gap-2.5">
        <span className="h-px flex-1 bg-[#D0D5DD]" />
        <span className="text-gray-500 text-sm leading-7 font-semibold uppercase">
          OR
        </span>
        <span className="h-px flex-1 bg-[#D0D5DD]" />
      </div>

      <Button
        type="button"
        variant="ghost"
        className="flex h-13.5 w-full rounded-2xl border border-gray-500 items-center justify-center gap-3"
      >
        <div className="relative size-6">
          <Image src="/images/google.svg" alt="Google" fill />
        </div>
        <span className="text-dark text-base leading-6 font-medium">
          Continue with Google
        </span>
      </Button>

      <div className="flex flex-wrap items-center justify-center gap-x-1 gap-y-1 text-center">
        <p className="text-gray-500 text-sm leading-6 font-medium md:text-base">
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

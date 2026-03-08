"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { NameFieldsRow } from "./components/name-fields-row";
import { SignUpEmailField } from "./components/sign-up-email-field";
import { SignUpPasswordField } from "./components/sign-up-password-field";
import Image from "next/image";
import {
  signUpFieldsSchema,
  signUpSchema,
  type SignUpSchemaValues,
} from "@/schemas/auth/sign-up";
import { registerAPI } from "@/services/mutations";
import toast from "react-hot-toast";
import Loader from "@/components/ui/loader";
import { useRouter } from "next/navigation";

export function SignUpForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpSchemaValues>({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  const onSubmit = async (data: SignUpSchemaValues) => {
    const result = await registerAPI(data);
    if (result?.ok) {
      toast.success(result?.message || "Account created successfully");
      router.push(`/verify-otp?email=${encodeURIComponent(data.email)}`);
      return;
    }
    toast.error(result?.message);
  };

  return (
    <form className="w-full space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <NameFieldsRow
        firstNameRegister={register("first_name", {
          validate: (value) => {
            const result = signUpFieldsSchema.shape.first_name.safeParse(value);
            return result.success || result.error.issues[0]?.message;
          },
        })}
        lastNameRegister={register("last_name", {
          validate: (value) => {
            const result = signUpFieldsSchema.shape.last_name.safeParse(value);
            return result.success || result.error.issues[0]?.message;
          },
        })}
        firstNameErrorMessage={errors.first_name?.message}
        lastNameErrorMessage={errors.last_name?.message}
      />

      <SignUpEmailField
        register={register("email", {
          validate: (value) => {
            const result = signUpFieldsSchema.shape.email.safeParse(value);
            return result.success || result.error.issues[0]?.message;
          },
        })}
        errorMessage={errors.email?.message}
      />

      <SignUpPasswordField
        label="Password"
        placeholder="Password"
        register={register("password", {
          validate: (value) => {
            const result = signUpFieldsSchema.shape.password.safeParse(value);
            return result.success || result.error.issues[0]?.message;
          },
        })}
        errorMessage={errors.password?.message}
        showPassword={showPassword}
        onToggleShowPassword={() => setShowPassword((value) => !value)}
      />

      <SignUpPasswordField
        label="Confirm New Password"
        placeholder="Confirm Password"
        register={register("password_confirmation", {
          validate: (value, formValues) => {
            const fieldResult =
              signUpFieldsSchema.shape.password_confirmation.safeParse(value);
            if (!fieldResult.success) {
              return fieldResult.error.issues[0]?.message;
            }

            const schemaResult = signUpSchema.safeParse({
              ...formValues,
              confirmPassword: value,
            });
            return (
              schemaResult.success ||
              schemaResult.error.issues.find(
                (issue) => issue.path[0] === "confirmPassword",
              )?.message
            );
          },
        })}
        errorMessage={errors.password_confirmation?.message}
        showPassword={showConfirmPassword}
        onToggleShowPassword={() => setShowConfirmPassword((value) => !value)}
      />

      <Button
        type="submit"
        className="h-13.75 w-full rounded-2xl bg-primary px-8 text-[18px] font-medium text-white"
      >
        {isSubmitting ? <Loader /> : "Create Account"}
      </Button>

      <div className="flex items-center justify-center gap-2.5">
        <span className="h-px flex-1 bg-[#D0D5DD]" />
        <span className="text-sm leading-7 font-semibold text-gray-500 uppercase">
          OR
        </span>
        <span className="h-px flex-1 bg-[#D0D5DD]" />
      </div>

      <Button
        type="button"
        variant="ghost"
        className="flex h-13.5 w-full items-center justify-center gap-3 rounded-2xl border border-gray-500"
      >
        <div className="relative size-6">
          <Image src="/images/google.svg" alt="Google" fill />
        </div>
        <span className="text-base leading-6 font-medium text-dark">
          Continue with Google
        </span>
      </Button>

      <div className="flex items-center justify-center gap-1">
        <p className="text-center text-base leading-6 font-medium text-gray-500">
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

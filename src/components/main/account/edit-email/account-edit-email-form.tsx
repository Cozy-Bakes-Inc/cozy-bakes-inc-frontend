"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import toast from "react-hot-toast";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { Shimmer } from "@/components/ui/shimmer";
import { useAuthenticatedUser } from "@/hooks";
import type { AccountEditEmailData } from "@/interfaces/main/account";
import { resendOtpSchema } from "@/schemas";
import { editEmailSchema, type EditEmailSchemaValues } from "@/schemas/main/account";
import { sendOrResendOtpAPI } from "@/services/mutations";
import {
  createNextEditEmailEndAt,
  setPendingEditEmailContext,
} from "./constants";

type AccountEditEmailFormProps = {
  data: AccountEditEmailData;
  onSuccess: (context: { currentEmail: string; newEmail: string }) => void;
};

const defaultValues: EditEmailSchemaValues = {
  new_email: "",
};

export default function AccountEditEmailForm({
  data,
  onSuccess,
}: AccountEditEmailFormProps) {
  const { data: authenticatedUser, isLoading } = useAuthenticatedUser(true);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const user = authenticatedUser?.data?.user;
  const email = user?.email ?? data.email;
  const initialEmail = useMemo(() => email.trim(), [email]);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting },
  } = useForm<EditEmailSchemaValues>({
    defaultValues,
  });

  useEffect(() => {
    reset({
      new_email: initialEmail,
    });
  }, [initialEmail, reset]);

  const nextEmail = useWatch({
    control,
    name: "new_email",
  });
  const isEmailChanged =
    Boolean(nextEmail?.trim()) &&
    nextEmail.trim().toLowerCase() !== initialEmail.toLowerCase();

  const onSubmit = async (formData: EditEmailSchemaValues) => {
    const payload = {
      current_email: initialEmail,
      new_email: formData.new_email.trim(),
    };

    if (payload.new_email.toLowerCase() === payload.current_email.toLowerCase()) {
      reset({ new_email: initialEmail });
      return;
    }

    const parsed = resendOtpSchema.safeParse({ email: payload.current_email });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message);
      return;
    }

    setIsSendingOtp(true);
    const result = await sendOrResendOtpAPI(parsed.data);

    if (result?.ok) {
      const nextContext = {
        currentEmail: payload.current_email,
        newEmail: payload.new_email,
      };
      setPendingEditEmailContext(nextContext);
      createNextEditEmailEndAt();
      toast.success(result.message || "Verification code sent");
      onSuccess(nextContext);
      setIsSendingOtp(false);
      return;
    }

    toast.error(result?.message || "Failed to send verification code");
    setIsSendingOtp(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-3 rounded-2xl bg-background p-3 sm:p-4">
        {isLoading ? (
          <div className="space-y-2">
            <Shimmer className="h-6 w-28 rounded-md" />
            <Shimmer className="h-14 w-full rounded-lg" />
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-base font-medium text-dark">{data.emailLabel}</p>
            <div className="rounded-lg border border-primary/90 bg-background px-3">
              <div className="flex min-h-14 items-center gap-2">
                <Mail className="size-5 shrink-0 text-primary" />
                <input
                  className="h-full min-h-14 w-full bg-transparent text-base font-medium text-dark outline-none placeholder:text-gray"
                  placeholder="Enter your new email"
                  {...register("new_email", {
                    validate: (value) => {
                      const result =
                        editEmailSchema.shape.new_email.safeParse(value);
                      return result.success || result.error.issues[0]?.message;
                    },
                  })}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <Button
        type="submit"
        size="default"
        disabled={isLoading || isSubmitting || isSendingOtp || !isEmailChanged}
        className="mt-6 h-14 w-full rounded-2xl border border-primary bg-primary text-base font-medium text-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]"
      >
        {isSubmitting || isSendingOtp ? <Loader /> : data.submitLabel}
      </Button>
    </form>
  );
}

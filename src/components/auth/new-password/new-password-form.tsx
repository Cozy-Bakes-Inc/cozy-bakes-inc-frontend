"use client";

import { type FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { NewPasswordField } from "./components/new-password-field";
import { useRouter } from "next/navigation";

export function NewPasswordForm() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  const handleChangePassword = () => {
    router.push("/login");
  };
  return (
    <form className="w-full space-y-5" onSubmit={handleSubmit}>
      <NewPasswordField
        label="New Password"
        placeholder="New Password"
        value={newPassword}
        showPassword={showNewPassword}
        onValueChange={setNewPassword}
        onToggleShowPassword={() => setShowNewPassword((value) => !value)}
      />

      <NewPasswordField
        label="Confirm New Password"
        placeholder="Confirm New Password"
        value={confirmNewPassword}
        showPassword={showConfirmPassword}
        onValueChange={setConfirmNewPassword}
        onToggleShowPassword={() => setShowConfirmPassword((value) => !value)}
      />

      <Button
        onClick={handleChangePassword}
        type="submit"
        className="h-13.75 w-full rounded-2xl bg-primary px-8 text-[18px] font-medium text-white"
      >
        Change Password
      </Button>
    </form>
  );
}

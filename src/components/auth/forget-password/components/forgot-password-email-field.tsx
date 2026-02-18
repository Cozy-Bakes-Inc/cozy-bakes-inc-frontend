import { Mail } from "lucide-react";

type ForgotPasswordEmailFieldProps = {
  email: string;
  onEmailChange: (value: string) => void;
};

export function ForgotPasswordEmailField({
  email,
  onEmailChange,
}: ForgotPasswordEmailFieldProps) {
  return (
    <div className="space-y-2">
      <label className="block text-base leading-6 font-medium text-dark">
        Email
      </label>
      <div className="flex h-13.75 items-center gap-2.5 rounded-xl border border-[gray] px-3">
        <Mail className="size-6 text-primary" />
        <input
          type="email"
          value={email}
          onChange={(event) => onEmailChange(event.target.value)}
          placeholder="Email"
          className="w-full bg-transparent text-base leading-6 font-medium text-[gray] outline-none"
        />
      </div>
    </div>
  );
}

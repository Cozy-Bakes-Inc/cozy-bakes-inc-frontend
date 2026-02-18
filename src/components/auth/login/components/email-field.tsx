import { Mail } from "lucide-react";

type EmailFieldProps = {
  email: string;
  onEmailChange: (value: string) => void;
};

export function EmailField({ email, onEmailChange }: EmailFieldProps) {
  return (
    <div className="space-y-2">
      <label className="block text-dark text-base leading-6 font-medium">
        Email
      </label>
      <div className="flex h-13.75 items-center gap-2.5 rounded-xl border border-[gray] px-3">
        <Mail className="size-6 text-primary" />
        <input
          type="email"
          value={email}
          onChange={(event) => onEmailChange(event.target.value)}
          placeholder="Email"
          className="w-full bg-transparent text-base text-[gray] leading-6 font-medium outline-none"
        />
      </div>
    </div>
  );
}

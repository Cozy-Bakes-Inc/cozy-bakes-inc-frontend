import { Mail } from "lucide-react";

type SignUpEmailFieldProps = {
  email: string;
  onEmailChange: (value: string) => void;
};

export function SignUpEmailField({
  email,
  onEmailChange,
}: SignUpEmailFieldProps) {
  return (
    <div className="space-y-2">
      <label className="block text-base leading-6 font-medium text-dark">
        Email <span className="text-[#F04438]">*</span>
      </label>
      <div className="flex h-13.75 items-center gap-2.5 rounded-xl border border-[#98A2B3] px-3">
        <Mail className="size-6 text-primary" />
        <input
          type="email"
          value={email}
          onChange={(event) => onEmailChange(event.target.value)}
          placeholder="Email"
          className="w-full bg-transparent text-base leading-6 font-medium text-[#98A2B3] outline-none"
        />
      </div>
    </div>
  );
}

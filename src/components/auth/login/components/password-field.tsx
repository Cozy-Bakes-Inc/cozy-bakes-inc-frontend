import { Eye, EyeOff, LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";

type PasswordFieldProps = {
  password: string;
  showPassword: boolean;
  onPasswordChange: (value: string) => void;
  onToggleShowPassword: () => void;
};

export function PasswordField({
  password,
  showPassword,
  onPasswordChange,
  onToggleShowPassword,
}: PasswordFieldProps) {
  return (
    <div className="space-y-2">
      <label className="block text-dark text-base leading-6 font-medium">
        Password
      </label>
      <div className="flex h-13.75 items-center gap-2.5 rounded-xl border border-[#98A2B3] px-3">
        <LockKeyhole className="size-6 text-primary" />
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(event) => onPasswordChange(event.target.value)}
          placeholder="Password"
          className="w-full bg-transparent text-base text-[#98A2B3] leading-6 font-medium outline-none"
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onToggleShowPassword}
          className="text-primary hover:bg-transparent hover:text-dark"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeOff className="size-6" />
          ) : (
            <Eye className="size-6" />
          )}
        </Button>
      </div>
    </div>
  );
}

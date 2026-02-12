import { Eye, EyeOff, LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";

type SignUpPasswordFieldProps = {
  label: string;
  placeholder: string;
  value: string;
  showPassword: boolean;
  onValueChange: (value: string) => void;
  onToggleShowPassword: () => void;
};

export function SignUpPasswordField({
  label,
  placeholder,
  value,
  showPassword,
  onValueChange,
  onToggleShowPassword,
}: SignUpPasswordFieldProps) {
  return (
    <div className="space-y-2">
      <label className="block text-base leading-6 font-medium text-dark">
        {label} <span className="text-[#F04438]">*</span>
      </label>
      <div className="flex h-13.75 items-center gap-2.5 rounded-xl border border-[#98A2B3] px-3">
        <LockKeyhole className="size-6 text-primary" />
        <input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={(event) => onValueChange(event.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent text-base leading-6 font-medium text-[#98A2B3] outline-none"
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

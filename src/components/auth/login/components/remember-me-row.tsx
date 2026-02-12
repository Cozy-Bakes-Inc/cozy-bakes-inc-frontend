import Link from "next/link";
import { Check } from "lucide-react";

type RememberMeRowProps = {
  rememberMe: boolean;
  onRememberMeChange: (value: boolean) => void;
};

export function RememberMeRow({
  rememberMe,
  onRememberMeChange,
}: RememberMeRowProps) {
  return (
    <div className="flex h-7 items-center justify-between">
      <label className="flex cursor-pointer items-center gap-2">
        <input
          type="checkbox"
          checked={rememberMe}
          onChange={(event) => onRememberMeChange(event.target.checked)}
          className="peer sr-only"
        />
        <span className="flex size-5 items-center justify-center rounded-sm border border-primary bg-white text-transparent peer-checked:bg-primary peer-checked:text-white">
          <Check className="size-4" strokeWidth={2.5} />
        </span>
        <span className="text-[#667085] text-base leading-6 font-medium">
          Remember me
        </span>
      </label>

      <Link
        href="/forgot-password"
        className="text-dark text-base leading-6 font-medium"
      >
        Forget Password ?
      </Link>
    </div>
  );
}

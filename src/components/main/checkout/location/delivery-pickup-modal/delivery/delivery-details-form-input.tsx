import InputErrorMessage from "@/components/ui/input-error-message";
import type { UseFormRegisterReturn } from "react-hook-form";

interface DeliveryDetailsFormInputProps {
  label: string;
  placeholder: string;
  optional?: boolean;
  errorMessage?: string;
  type?: string;
  register: UseFormRegisterReturn;
}

export default function DeliveryDetailsFormInput({
  label,
  placeholder,
  optional,
  errorMessage,
  type = "text",
  register,
}: DeliveryDetailsFormInputProps) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-medium text-dark md:text-base">
        {label}{" "}
        {optional && (
          <span className="text-xs font-medium text-gray-500 md:text-sm">
            (Optional)
          </span>
        )}
      </span>

      <div className="rounded-lg border border-gray-300 px-3">
        <input
          type={type}
          placeholder={placeholder}
          className="h-14.5 w-full bg-transparent text-sm text-dark outline-none placeholder:text-gray md:text-base"
          {...register}
        />
      </div>
      <InputErrorMessage msg={errorMessage} className="pt-0" />
    </label>
  );
}

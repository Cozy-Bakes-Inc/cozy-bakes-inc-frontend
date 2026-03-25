import { type ReactNode } from "react";

interface FieldProps {
  label: string;
  placeholder: string;
  optional?: boolean;
  rightSlot?: ReactNode;
  value?: string;
  onChange?: (value: string) => void;
}

export default function Field({
  label,
  placeholder,
  optional,
  rightSlot,
  value,
  onChange,
}: FieldProps) {
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
      <div className="flex h-14.5 items-center gap-2 rounded-lg border border-gray-300 px-3">
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(event) => onChange?.(event.target.value)}
          className="h-full w-full bg-transparent text-sm text-dark outline-none placeholder:text-gray md:text-base"
        />
        {rightSlot}
      </div>
    </label>
  );
}

import { type ReactNode } from "react";

interface FieldProps {
  label: string;
  placeholder: string;
  optional?: boolean;
  rightSlot?: ReactNode;
}

export default function Field({
  label,
  placeholder,
  optional,
  rightSlot,
}: FieldProps) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-medium text-delivery-modal-text md:text-base">
        {label}{" "}
        {optional && (
          <span className="text-xs font-medium text-delivery-modal-muted-text md:text-sm">
            (Optional)
          </span>
        )}
      </span>
      <div className="flex h-14.5 items-center gap-2 rounded-lg border border-delivery-modal-input-border px-3">
        <input
          type="text"
          placeholder={placeholder}
          className="h-full w-full bg-transparent text-sm text-delivery-modal-text outline-none placeholder:text-delivery-modal-placeholder md:text-base"
        />
        {rightSlot}
      </div>
    </label>
  );
}

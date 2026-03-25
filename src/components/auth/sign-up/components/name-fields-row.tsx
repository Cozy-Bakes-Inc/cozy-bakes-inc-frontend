import { type UseFormRegisterReturn } from "react-hook-form";
import InputErrorMessage from "@/components/ui/input-error-message";

type NameFieldsRowProps = {
  firstNameRegister: UseFormRegisterReturn<"first_name">;
  lastNameRegister: UseFormRegisterReturn<"last_name">;
  firstNameErrorMessage?: string;
  lastNameErrorMessage?: string;
};

export function NameFieldsRow({
  firstNameRegister,
  lastNameRegister,
  firstNameErrorMessage,
  lastNameErrorMessage,
}: NameFieldsRowProps) {
  return (
    <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
      <div className="space-y-2">
        <label className="block text-base leading-6 font-medium text-dark">
          First name <span className="text-[#F04438]">*</span>
        </label>
        <div className="flex h-13.75 items-center gap-2.5 rounded-xl border border-[gray] px-3">
          <input
            {...firstNameRegister}
            type="text"
            placeholder="First name"
            className="w-full bg-transparent text-base leading-6 font-medium text-[gray] outline-none"
          />
        </div>
        <InputErrorMessage msg={firstNameErrorMessage} />
      </div>

      <div className="space-y-2">
        <label className="block text-base leading-6 font-medium text-dark">
          Last name <span className="text-[#F04438]">*</span>
        </label>
        <div className="flex h-13.75 items-center gap-2.5 rounded-xl border border-[gray] px-3">
          <input
            {...lastNameRegister}
            type="text"
            placeholder="Last name"
            className="w-full bg-transparent text-base leading-6 font-medium text-[gray] outline-none"
          />
        </div>
        <InputErrorMessage msg={lastNameErrorMessage} />
      </div>
    </div>
  );
}

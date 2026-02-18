type NameFieldsRowProps = {
  firstName: string;
  lastName: string;
  onFirstNameChange: (value: string) => void;
  onLastNameChange: (value: string) => void;
};

export function NameFieldsRow({
  firstName,
  lastName,
  onFirstNameChange,
  onLastNameChange,
}: NameFieldsRowProps) {
  return (
    <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
      <div className="space-y-2">
        <label className="block text-base leading-6 font-medium text-dark">
          First name <span className="text-[#F04438]">*</span>
        </label>
        <div className="flex h-13.75 items-center gap-2.5 rounded-xl border border-[gray] px-3">
          <input
            type="text"
            value={firstName}
            onChange={(event) => onFirstNameChange(event.target.value)}
            placeholder="First name"
            className="w-full bg-transparent text-base leading-6 font-medium text-[gray] outline-none"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-base leading-6 font-medium text-dark">
          Last name <span className="text-[#F04438]">*</span>
        </label>
        <div className="flex h-13.75 items-center gap-2.5 rounded-xl border border-[gray] px-3">
          <input
            type="text"
            value={lastName}
            onChange={(event) => onLastNameChange(event.target.value)}
            placeholder="Last name"
            className="w-full bg-transparent text-base leading-6 font-medium text-[gray] outline-none"
          />
        </div>
      </div>
    </div>
  );
}

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

type VerifyOtpInputProps = {
  otp: string;
  onOtpChange: (value: string) => void;
};

export function VerifyOtpInput({ otp, onOtpChange }: VerifyOtpInputProps) {
  const slotClassName =
    "size-17.5 shrink-0 rounded-xl !border !border-primary bg-[#FBF8EB0D] text-[20px] font-semibold text-dark shadow-none first:!rounded-xl last:!rounded-xl data-[active=true]:ring-primary/50";

  return (
    <InputOTP
      maxLength={5}
      value={otp}
      onChange={onOtpChange}
      containerClassName="w-full justify-center"
      className="w-full"
    >
      <InputOTPGroup className="flex w-full items-center justify-between gap-2">
        <InputOTPSlot index={0} className={slotClassName} />
        <InputOTPSlot index={1} className={slotClassName} />
        <InputOTPSlot index={2} className={slotClassName} />
        <InputOTPSlot index={3} className={slotClassName} />
        <InputOTPSlot index={4} className={slotClassName} />
      </InputOTPGroup>
    </InputOTP>
  );
}

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";

type ForgotPasswordVerificationSectionProps = {
  email: string;
  onVerify: () => void;
};

export default function ForgotPasswordVerificationSection({
  email,
  onVerify,
}: ForgotPasswordVerificationSectionProps) {
  const slotClassName =
    "h-[70px] w-full max-w-[70px] shrink-0 rounded-lg !border !border-primary bg-[#FBF8EB0D] text-2xl font-semibold text-dark shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] first:!rounded-lg last:!rounded-lg data-[active=true]:!border-primary data-[active=true]:!ring-0";

  return (
    <div className="mt-3 space-y-6">
      <div className="rounded-2xl bg-background px-4 py-6 sm:px-6">
        <div className="mx-auto flex w-full max-w-[580px] flex-col items-center gap-8">
          <p className="text-center text-lg font-medium leading-7 text-[#667085]">
            We&apos;ve sent a verification code to{" "}
            <span className="font-semibold text-dark">{email}</span>. Please
            enter the code below to proceed.
          </p>

          <div className="w-full space-y-5">
            <InputOTP
              maxLength={5}
              containerClassName="w-full justify-center"
              className="w-full"
            >
              <InputOTPGroup className="w-full justify-center gap-2 sm:gap-6">
                <InputOTPSlot index={0} className={slotClassName} />
                <InputOTPSlot index={1} className={slotClassName} />
                <InputOTPSlot index={2} className={slotClassName} />
                <InputOTPSlot index={3} className={slotClassName} />
                <InputOTPSlot index={4} className={slotClassName} />
              </InputOTPGroup>
            </InputOTP>

            <p className="text-center text-base font-medium text-gray">
              Send Code again : <span className="font-semibold text-dark">00:02</span>
            </p>
          </div>
        </div>
      </div>

      <Button
        type="button"
        size="default"
        onClick={onVerify}
        className="h-14 w-full rounded-lg border border-primary bg-primary text-base font-medium text-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]"
      >
        Verify Your Email
      </Button>
    </div>
  );
}

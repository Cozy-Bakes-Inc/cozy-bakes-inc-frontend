import CheckoutSectionCard from "./checkout-section-card";

const inputClassName =
  "h-10 w-full rounded-md border border-primary/45 bg-background px-3 text-sm text-dark outline-none transition placeholder:text-gray-400 focus:border-primary";

export default function ReceiverDetailsForm() {
  return (
    <CheckoutSectionCard title="Receiver Details">
      <div className="space-y-3">
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="space-y-1">
            <span className="text-xs font-medium text-dark">First Name</span>
            <input className={inputClassName} defaultValue="Michael" />
          </label>

          <label className="space-y-1">
            <span className="text-xs font-medium text-dark">Last Name</span>
            <input className={inputClassName} defaultValue="Anderson" />
          </label>
        </div>

        <label className="block space-y-1">
          <span className="text-xs font-medium text-dark">Phone Number</span>
          <div className="relative">
            <input
              className={`${inputClassName} pr-16`}
              defaultValue="(419) 628-9473"
            />
            <div className="absolute inset-y-0 right-3 inline-flex items-center gap-1 text-xs text-dark"></div>
          </div>
        </label>
      </div>
    </CheckoutSectionCard>
  );
}

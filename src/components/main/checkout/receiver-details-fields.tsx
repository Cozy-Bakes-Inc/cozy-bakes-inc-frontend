"use client";

import { useDeliveryPickupModalStore } from "@/store/delivery-pickup-modal-store";
import { formatPhoneDisplay } from "@/lib";

export default function ReceiverDetailsFields() {
  const receiverDetails = useDeliveryPickupModalStore(
    (state) => state.receiverDetails,
  );

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-dark md:text-base">
            First Name
          </span>
          <div className="flex h-14.5 items-center gap-2 rounded-lg border border-gray-300 px-3">
            <input
              className="h-full w-full bg-transparent text-sm text-dark outline-none placeholder:text-gray disabled:cursor-not-allowed md:text-base"
              value={receiverDetails.firstName}
              disabled
              placeholder="First Name"
            />
          </div>
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-dark md:text-base">
            Last Name
          </span>
          <div className="flex h-14.5 items-center gap-2 rounded-lg border border-gray-300 px-3">
            <input
              className="h-full w-full bg-transparent text-sm text-dark outline-none placeholder:text-gray disabled:cursor-not-allowed md:text-base"
              value={receiverDetails.lastName}
              disabled
              placeholder="Last Name"
            />
          </div>
        </label>
      </div>

      <label className="flex flex-col gap-2">
        <span className="text-sm font-medium text-dark md:text-base">
          Phone Number
        </span>
        <div className="flex h-14.5 items-center gap-2 rounded-lg border border-gray-300 px-3">
          <input
            type="tel"
            className="h-full w-full bg-transparent text-sm text-dark outline-none placeholder:text-gray disabled:cursor-not-allowed md:text-base"
            value={formatPhoneDisplay(receiverDetails.phoneNumber)}
            disabled
            placeholder="(212) 555-7890"
          />
        </div>
      </label>
    </div>
  );
}

"use client";

import { useDeliveryPickupModalStore } from "@/store/delivery-pickup-modal-store";

export default function ReceiverDetailsFields() {
  const receiverDetails = useDeliveryPickupModalStore(
    (state) => state.receiverDetails,
  );
  const setReceiverField = useDeliveryPickupModalStore(
    (state) => state.setReceiverField,
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
              className="h-full w-full bg-transparent text-sm text-dark outline-none placeholder:text-gray md:text-base"
              value={receiverDetails.firstName}
              onChange={(event) =>
                setReceiverField("firstName", event.target.value)
              }
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
              className="h-full w-full bg-transparent text-sm text-dark outline-none placeholder:text-gray md:text-base"
              value={receiverDetails.lastName}
              onChange={(event) =>
                setReceiverField("lastName", event.target.value)
              }
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
            className="h-full w-full bg-transparent text-sm text-dark outline-none placeholder:text-gray md:text-base"
            value={receiverDetails.phoneNumber}
            onChange={(event) =>
              setReceiverField("phoneNumber", event.target.value)
            }
            placeholder="1234 5678 9564"
          />
        </div>
      </label>
    </div>
  );
}

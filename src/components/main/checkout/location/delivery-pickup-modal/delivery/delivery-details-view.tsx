import { Button } from "@/components/ui/button";
import { LOCATION_IMAGE } from "@/constants";
import Image from "next/image";
import Field from "./field";

interface DeliveryDetailsViewProps {
  onBackToMap: () => void;
  onSaveLocation?: () => void;
}

export default function DeliveryDetailsView({
  onBackToMap,
  onSaveLocation,
}: DeliveryDetailsViewProps) {
  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 rounded-2xl border border-delivery-modal-map-border p-2.5 md:flex-row md:items-center md:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          <div className="grid size-16.75 shrink-0 place-items-center rounded-lg bg-delivery-modal-map-surface">
            <Image
              src={LOCATION_IMAGE}
              alt="Selected location"
              width={50}
              height={50}
            />
          </div>
          <div className="min-w-0 space-y-1">
            <p className="text-xs font-semibold text-delivery-modal-border">
              Deliver to
            </p>
            <p className="text-sm font-semibold text-delivery-modal-text md:text-base">
              New York
            </p>
            <p className="wrap-break-word text-xs font-medium text-delivery-modal-muted-text">
              1600 Pennsylvania Avenue NW - White House - Washington - DC 20500
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          onClick={onBackToMap}
          className="h-13.5 w-full border-delivery-modal-border px-4 text-sm font-medium text-delivery-modal-border hover:bg-delivery-modal-border/10 md:w-auto md:px-6 md:text-base"
        >
          Change Location
        </Button>
      </div>

      <section className="rounded-3xl border border-delivery-modal-map-border px-4 py-4 md:px-6">
        <h3 className="mb-4 text-lg font-medium leading-7 text-delivery-modal-border md:text-[18px]">
          Address Details
        </h3>
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Field
              label="Apt & Flower / Vill No"
              placeholder="Apt & Flower / Vill No"
            />
            <Field
              label="Building / Cluster Name"
              placeholder="Building / Cluster Name"
            />
          </div>
          <Field
            label="Street Name / Landmark"
            placeholder="Street Name / Landmark"
            optional
          />
        </div>
      </section>

      <section className="rounded-3xl border border-delivery-modal-map-border px-4 py-4 md:px-6">
        <h3 className="mb-4 text-lg font-medium leading-7 text-delivery-modal-border md:text-[18px]">
          Receiver Details
        </h3>
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="First Name" placeholder="First Name" />
            <Field label="Last Name" placeholder="Last Name" />
          </div>
          <Field label="Phone Number" placeholder="1234 5678 9564" />
        </div>
      </section>

      <div className="flex justify-end">
        <Button
          onClick={onSaveLocation}
          className="h-13.5 w-full rounded-lg bg-delivery-modal-primary-soft px-6 text-sm font-medium text-white hover:bg-delivery-modal-primary-soft md:w-auto md:min-w-50.5 md:text-base"
        >
          Save Location
        </Button>
      </div>
    </div>
  );
}

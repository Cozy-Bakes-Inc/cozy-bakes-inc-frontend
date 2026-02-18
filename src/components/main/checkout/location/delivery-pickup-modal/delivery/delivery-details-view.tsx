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
      <div className="flex flex-col gap-3 rounded-2xl border border-border/24 p-2.5 md:flex-row md:items-center md:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          <div className="grid size-16.75 shrink-0 place-items-center rounded-lg bg-bg-creamy">
            <Image
              src={LOCATION_IMAGE}
              alt="Selected location"
              width={50}
              height={50}
            />
          </div>
          <div className="min-w-0 space-y-1">
            <p className="text-xs font-semibold text-primary">Deliver to</p>
            <p className="text-sm font-semibold text-dark md:text-base">
              New York
            </p>
            <p className="wrap-break-word text-xs font-medium text-gray-500">
              1600 Pennsylvania Avenue NW - White House - Washington - DC 20500
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          onClick={onBackToMap}
          className="h-13.5 w-full border-primary px-4 text-sm font-medium text-primary hover:bg-primary/10 hover:text-primary md:w-auto md:px-6 md:text-base"
        >
          Change Location
        </Button>
      </div>

      <section className="rounded-3xl border border-border/24 px-4 py-4 md:px-6">
        <h3 className="mb-4 text-lg font-medium leading-7 text-primary md:text-[18px]">
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

      <section className="rounded-3xl border border-border/24 px-4 py-4 md:px-6">
        <h3 className="mb-4 text-lg font-medium leading-7 text-primary md:text-[18px]">
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
          className="h-13.5 w-full rounded-lg bg-primary px-6 text-sm font-medium text-white hover:bg-primary/50 md:w-auto md:min-w-50.5 md:text-base"
        >
          Save Location
        </Button>
      </div>
    </div>
  );
}

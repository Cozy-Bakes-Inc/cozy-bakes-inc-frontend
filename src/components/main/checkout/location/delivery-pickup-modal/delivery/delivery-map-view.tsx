"use client";

import { Button } from "@/components/ui/button";
import { useDeliveryPickupModalStore } from "@/store/delivery-pickup-modal-store";
import dynamic from "next/dynamic";
import { LocateFixed, MapPin, Search } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

interface DeliveryMapViewProps {
  onConfirmLocation: () => void;
}

type NominatimSearchResult = {
  lat: string;
  lon: string;
  display_name: string;
  name?: string;
};

type ReverseGeocodeResult = {
  display_name?: string;
  name?: string;
};

const DeliveryLeafletMap = dynamic(() => import("./delivery-leaflet-map"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full w-full place-items-center bg-bg-creamy text-sm font-medium text-gray-500">
      Loading map...
    </div>
  ),
});

function getLocationLabel(result: {
  name?: string;
  display_name?: string;
}) {
  if (result.name?.trim()) return result.name.trim();

  const [firstPart] = result.display_name?.split(",") ?? [];
  return firstPart?.trim() || "Selected Location";
}

export default function DeliveryMapView({
  onConfirmLocation,
}: DeliveryMapViewProps) {
  const deliveryLocation = useDeliveryPickupModalStore(
    (state) => state.deliveryLocation,
  );
  const setDeliveryLocation = useDeliveryPickupModalStore(
    (state) => state.setDeliveryLocation,
  );
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<NominatimSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLocating, setIsLocating] = useState(false);

  const applySelectedLocation = ({
    latitude,
    longitude,
    fullAddress,
    label,
  }: {
    latitude: number;
    longitude: number;
    fullAddress: string;
    label: string;
  }) => {
    setDeliveryLocation({
      ...deliveryLocation,
      latitude,
      longitude,
      fullAddress,
      label,
    });
  };

  const searchLocation = async () => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;

    setIsSearching(true);

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=5&q=${encodeURIComponent(trimmedQuery)}`,
        {
          headers: {
            Accept: "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to search for locations");
      }

      const data = (await response.json()) as NominatimSearchResult[];
      setResults(data);

      if (!data.length) {
        toast.error("No locations found");
      }
    } catch {
      toast.error("Failed to search for location");
    } finally {
      setIsSearching(false);
    }
  };

  const reverseGeocode = async (latitude: number, longitude: number) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
      {
        headers: {
          Accept: "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to resolve location");
    }

    return (await response.json()) as ReverseGeocodeResult;
  };

  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported in this browser");
      return;
    }

    setIsLocating(true);

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const result = await reverseGeocode(
            coords.latitude,
            coords.longitude,
          );

          applySelectedLocation({
            latitude: coords.latitude,
            longitude: coords.longitude,
            fullAddress:
              result.display_name?.trim() || deliveryLocation.fullAddress,
            label: getLocationLabel(result),
          });

          setResults([]);
          toast.success("Current location updated");
        } catch {
          toast.error("Failed to resolve current location");
        } finally {
          setIsLocating(false);
        }
      },
      () => {
        setIsLocating(false);
        toast.error("Unable to access your current location");
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      },
    );
  };

  const handleMapSelect = async ({
    lat,
    lng,
  }: {
    lat: number;
    lng: number;
  }) => {
    try {
      const result = await reverseGeocode(lat, lng);

      applySelectedLocation({
        latitude: lat,
        longitude: lng,
        fullAddress: result.display_name?.trim() || deliveryLocation.fullAddress,
        label: getLocationLabel(result),
      });
    } catch {
      toast.error("Failed to update selected location");
    }
  };

  return (
    <>
      <div className="space-y-3">
        <div className="flex flex-col gap-3 md:flex-row">
          <div className="flex h-13.5 min-h-13.5 w-full flex-1 items-center gap-3 rounded-lg border border-gray bg-background px-3">
            <Search className="size-5 text-gray" />
            <input
              type="text"
              aria-label="Search for a location"
              placeholder="Search for a location"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  void searchLocation();
                }
              }}
              className="h-full w-full bg-transparent text-sm text-dark outline-none placeholder:text-gray md:text-base"
            />
          </div>
          <Button
            type="button"
            onClick={() => void searchLocation()}
            disabled={isSearching}
            variant="outline"
            className="h-13.5 min-h-13.5 rounded-lg border-primary px-5 text-sm font-medium text-primary hover:bg-primary/10 hover:text-primary md:text-base"
          >
            <Search className="size-5" />
            {isSearching ? "Searching..." : "Search"}
          </Button>
          <Button
            type="button"
            onClick={handleCurrentLocation}
            disabled={isLocating}
            className="h-13.5 min-h-13.5 rounded-lg bg-primary px-5 text-sm font-medium text-white hover:bg-primary/90 md:text-base"
          >
            <LocateFixed className="size-5" />
            {isLocating ? "Locating..." : "Use Current Location"}
          </Button>
        </div>

        {results.length > 0 && (
          <div className="rounded-2xl border border-border/24 bg-background p-2">
            <div className="space-y-2">
              {results.map((result) => (
                <button
                  key={`${result.lat}-${result.lon}`}
                  type="button"
                  onClick={() => {
                    applySelectedLocation({
                      latitude: Number(result.lat),
                      longitude: Number(result.lon),
                      fullAddress: result.display_name,
                      label: getLocationLabel(result),
                    });
                    setResults([]);
                  }}
                  className="flex w-full items-start gap-3 rounded-xl px-3 py-2 text-left transition hover:bg-bg-creamy"
                >
                  <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span className="text-sm text-dark">{result.display_name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="overflow-hidden rounded-3xl border border-border/24 bg-bg-creamy">
        <div className="relative h-80 sm:h-105">
          <DeliveryLeafletMap
            center={{
              lat: deliveryLocation.latitude,
              lng: deliveryLocation.longitude,
            }}
            onSelect={(coordinates) => {
              void handleMapSelect(coordinates);
            }}
          />

          <div className="pointer-events-none absolute left-4 top-4 rounded-full border border-primary/20 bg-background/95 px-4 py-2 text-xs font-medium text-dark shadow-sm md:text-sm">
            Click on the map to update your delivery point
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-border/24 bg-background p-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="grid size-13 place-items-center rounded-lg bg-bg-creamy">
              <MapPin className="size-5 text-primary" />
            </div>
            <div className="space-y-1">
              <p className="text-xs font-semibold text-primary">
                Current Location
              </p>
              <p className="text-sm font-semibold text-dark md:text-base">
                {deliveryLocation.label}
              </p>
              <p className="text-xs font-medium text-gray-500">
                {deliveryLocation.fullAddress}
              </p>
            </div>
          </div>

          <Button
            onClick={onConfirmLocation}
            className="h-11.5 rounded-lg bg-primary px-6 text-sm font-medium text-white hover:bg-primary/90 md:text-base"
          >
            Confirm Location
          </Button>
        </div>
      </div>
    </>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { Loader2, LocateFixed, MapPin, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import type { LocationPickerMapProps } from "./location-picker-map";

const LocationPickerMap = dynamic<LocationPickerMapProps>(
  () => import("./location-picker-map").then((mod) => mod.LocationPickerMap),
  {
    ssr: false,
    loading: () => (
      <div className="grid h-full w-full place-items-center bg-bg-creamy text-sm font-medium text-gray-500">
        Loading map...
      </div>
    ),
  },
);

type NominatimResult = {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
  name?: string;
};

type ReverseGeocodeResult = {
  display_name?: string;
  name?: string;
};

export interface LocationPickerProps {
  lat: number;
  lng: number;
  fallbackAddress?: string;
  onChange: (lat: number, lng: number, fullAddress: string, label: string) => void;
}

function getLabel(result: ReverseGeocodeResult) {
  if (result.name?.trim()) return result.name.trim();
  const [first] = result.display_name?.split(",") ?? [];
  return first?.trim() || "Selected Location";
}

async function reverseGeocode(lat: number, lng: number): Promise<ReverseGeocodeResult> {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=jsonv2`,
    { headers: { Accept: "application/json", "Accept-Language": "en" } },
  );
  if (!res.ok) throw new Error("Reverse geocode failed");
  return res.json() as Promise<ReverseGeocodeResult>;
}

export function LocationPicker({
  lat,
  lng,
  fallbackAddress = "",
  onChange,
}: LocationPickerProps) {
  const [query, setQuery] = useState(fallbackAddress);
  const [suggestions, setSuggestions] = useState<NominatimResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isReverseGeocoding, setIsReverseGeocoding] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [flyToCenter, setFlyToCenter] = useState<[number, number] | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const skipNextSearchRef = useRef(false);

  useEffect(() => {
    const trimmedFallbackAddress = fallbackAddress.trim();

    if (trimmedFallbackAddress) {
      skipNextSearchRef.current = true;
      setQuery(trimmedFallbackAddress);
    }

    if (!lat && !lng) return;
    setIsReverseGeocoding(true);
    reverseGeocode(lat, lng)
      .then((data) => {
        if (data.display_name) {
          skipNextSearchRef.current = true;
          setQuery(data.display_name);
        }
      })
      .catch(() => {
        if (trimmedFallbackAddress) {
          skipNextSearchRef.current = true;
          setQuery(trimmedFallbackAddress);
        }
      })
      .finally(() => setIsReverseGeocoding(false));
  }, [fallbackAddress, lat, lng]);

  useEffect(() => {
    const trimmed = query.trim();
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (skipNextSearchRef.current) {
      skipNextSearchRef.current = false;
      return;
    }

    if (!trimmed) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(trimmed)}&format=jsonv2&limit=5`,
          { headers: { Accept: "application/json", "Accept-Language": "en" } },
        );
        const data = (await res.json()) as NominatimResult[];
        setSuggestions(data);
        setShowDropdown(data.length > 0);
      } catch {
        setSuggestions([]);
        toast.error("Failed to search for location");
      } finally {
        setIsSearching(false);
      }
    }, 400);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelect(result: NominatimResult) {
    const newLat = parseFloat(parseFloat(result.lat).toFixed(6));
    const newLng = parseFloat(parseFloat(result.lon).toFixed(6));
    onChange(newLat, newLng, result.display_name, getLabel(result));
    setFlyToCenter([newLat, newLng]);
    skipNextSearchRef.current = true;
    setQuery(result.display_name);
    setShowDropdown(false);
  }

  async function handleMapChange(newLat: number, newLng: number) {
    setIsReverseGeocoding(true);
    try {
      const result = await reverseGeocode(newLat, newLng);
      const fullAddress = result.display_name?.trim() ?? "";
      onChange(newLat, newLng, fullAddress, getLabel(result));
      skipNextSearchRef.current = true;
      setQuery(fullAddress);
      setSuggestions([]);
      setShowDropdown(false);
    } catch {
      onChange(newLat, newLng, fallbackAddress.trim(), "Selected Location");
    } finally {
      setIsReverseGeocoding(false);
    }
  }

  function handleCurrentLocation() {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported in this browser");
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const result = await reverseGeocode(coords.latitude, coords.longitude);
          const fullAddress = result.display_name?.trim() ?? "";
          onChange(coords.latitude, coords.longitude, fullAddress, getLabel(result));
          setFlyToCenter([coords.latitude, coords.longitude]);
          skipNextSearchRef.current = true;
          setQuery(fullAddress);
          setSuggestions([]);
          setShowDropdown(false);
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
      { enableHighAccuracy: true, timeout: 10000 },
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-3 md:flex-row">
        <div ref={wrapperRef} className="relative flex-1">
          <div className="flex h-13.5 min-h-13.5 w-full items-center gap-3 rounded-lg border border-gray bg-background px-3">
            <Search className="size-5 shrink-0 text-gray" />
            {(isSearching || isReverseGeocoding) && (
              <Loader2 className="absolute right-3 top-1/2 size-4 -translate-y-1/2 animate-spin text-primary" />
            )}
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => suggestions.length > 0 && setShowDropdown(true)}
              onKeyDown={(e) => {
                if (e.key === "Escape") setShowDropdown(false);
                if (e.key === "Enter") e.preventDefault();
              }}
              placeholder="Search for a location"
              autoComplete="off"
              aria-label="Search for a location"
              className="h-full w-full bg-transparent text-sm text-dark outline-none placeholder:text-gray md:text-base"
            />
          </div>

          {showDropdown && (
            <ul className="absolute z-[9999] mt-1 max-h-56 w-full overflow-y-auto rounded-2xl border border-border/24 bg-background p-2 shadow-lg">
              {suggestions.map((result) => (
                <li key={result.place_id}>
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handleSelect(result)}
                    className="flex w-full items-start gap-3 rounded-xl px-3 py-2 text-left transition hover:bg-bg-creamy"
                  >
                    <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span className="text-sm text-dark">{result.display_name}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

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

      <div className="overflow-hidden rounded-3xl border border-border/24 bg-bg-creamy">
        <div className="relative h-80 sm:h-105">
          <LocationPickerMap
            lat={lat}
            lng={lng}
            flyToCenter={flyToCenter}
            onChange={(newLat, newLng) => void handleMapChange(newLat, newLng)}
          />
          <div className="pointer-events-none absolute left-4 top-4 rounded-full border border-primary/20 bg-background/95 px-4 py-2 text-xs font-medium text-dark shadow-sm md:text-sm">
            Click on the map to update your delivery point
          </div>
        </div>
      </div>
    </div>
  );
}

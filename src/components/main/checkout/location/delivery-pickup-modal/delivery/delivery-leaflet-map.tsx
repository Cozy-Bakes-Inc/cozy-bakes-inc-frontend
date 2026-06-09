"use client";

import type { LeafletMouseEvent } from "leaflet";
import { CircleMarker, MapContainer, TileLayer, useMap, useMapEvents } from "react-leaflet";

type Coordinates = {
  lat: number;
  lng: number;
};

interface DeliveryLeafletMapProps {
  center: Coordinates;
  onSelect: (coordinates: Coordinates) => void;
}

function RecenterMap({ center, hasLocation }: { center: Coordinates; hasLocation: boolean }) {
  const map = useMap();
  if (hasLocation) {
    map.setView(center, map.getZoom(), { animate: true });
  }
  return null;
}

function MapClickHandler({
  onSelect,
}: {
  onSelect: (coordinates: Coordinates) => void;
}) {
  useMapEvents({
    click(event: LeafletMouseEvent) {
      onSelect({
        lat: event.latlng.lat,
        lng: event.latlng.lng,
      });
    },
  });

  return null;
}

export default function DeliveryLeafletMap({
  center,
  onSelect,
}: DeliveryLeafletMapProps) {
  const hasLocation = center.lat !== 0 || center.lng !== 0;

  return (
    <MapContainer
      center={hasLocation ? center : { lat: 20, lng: 0 }}
      zoom={hasLocation ? 15 : 2}
      scrollWheelZoom
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <RecenterMap center={center} hasLocation={hasLocation} />

      <MapClickHandler onSelect={onSelect} />
      {hasLocation && (
        <CircleMarker
          center={center}
          pathOptions={{
            color: "#d19628",
            fillColor: "#d19628",
            fillOpacity: 0.9,
            weight: 3,
          }}
          radius={10}
        />
      )}
    </MapContainer>
  );
}

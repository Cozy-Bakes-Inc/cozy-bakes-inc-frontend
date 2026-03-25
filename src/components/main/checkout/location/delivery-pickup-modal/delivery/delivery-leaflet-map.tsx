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

function RecenterMap({ center }: { center: Coordinates }) {
  const map = useMap();
  map.setView(center, map.getZoom(), { animate: true });
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
  return (
    <MapContainer
      center={center}
      zoom={15}
      scrollWheelZoom
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <RecenterMap center={center} />
      <MapClickHandler onSelect={onSelect} />
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
    </MapContainer>
  );
}

"use client";

import { useState } from "react";
import { useMapEvent } from "react-leaflet";
import MapMarker from "@/components/map/map-marker";

function MapEventDemo() {
  const [position, setPosition] = useState<[number, number] | undefined>();
  const map = useMapEvent("click", (e) => {
    setPosition([e.latlng.lat, e.latlng.lng]);
    console.log(e.latlng);
  });

  return (
    position && (
      <MapMarker type="parking" position={position} interactive={false} />
    )
  );
}

export default MapEventDemo;

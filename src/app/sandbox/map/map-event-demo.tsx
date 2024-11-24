"use client";

import L, { LatLng } from "leaflet";
import { useState } from "react";
import ReactDOMServer from "react-dom/server";
import { Marker, useMapEvent } from "react-leaflet";
import IconMarker from "@/components/ui/icons/marker";

function MapEventDemo() {
  const [position, setPosition] = useState<LatLng | null>(null);
  const map = useMapEvent("click", (e) => {
    console.log(e.latlng);
    setPosition(e.latlng);
  });

  return position === null ? null : (
    <Marker
      icon={L.divIcon({
        className: "",
        html: ReactDOMServer.renderToString(<IconMarker type="parking" />),
        iconSize: [48, 48],
        iconAnchor: [24, 48],
        popupAnchor: [0, -36],
      })}
      position={position}
    ></Marker>
  );
}

export default MapEventDemo;

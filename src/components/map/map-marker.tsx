"use client";

import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import IconMarker from "../ui/icons/marker";
import { ReactNode } from "react";
import { useClientRenderToString } from "@/hooks/useClientRenderToString";

type TMapMarkerProps = {
  type: "parking" | "wall";
  position: [number, number];
  popupContent?: ReactNode;
  interactive?: boolean;
};

function MapMarker({
  type,
  position,
  popupContent,
  interactive = true,
}: TMapMarkerProps) {
  const [icon] = useClientRenderToString(<IconMarker type={type} />);

  return (
    <Marker
      icon={L.divIcon({
        className: "",
        html: icon,
        iconSize: [52, 52],
        iconAnchor: [26, 52],
        popupAnchor: [0, -46],
      })}
      position={position}
      interactive={interactive}
    >
      {popupContent && <Popup>{popupContent}</Popup>}
    </Marker>
  );
}

export default MapMarker;

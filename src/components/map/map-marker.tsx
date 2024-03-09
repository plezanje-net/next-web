import { Marker, Popup } from "react-leaflet";
import L, { FitBoundsOptions } from "leaflet";
import IconMarker from "../ui/icons/marker";
import { createRoot } from "react-dom/client";
import { ReactNode, useEffect, useState } from "react";
import { useClientRenderToString } from "@/hooks/useClientRenderToString";

type TMapMarkerProps = {
  marker: TMarker;
  index: number;
};

type TMarker = {
  type: "parking" | "wall";
  position: [number, number];
  popupContent?: ReactNode;
};

function MapMarker({ marker, index }: TMapMarkerProps) {
  const [icon] = useClientRenderToString(<IconMarker type={marker.type} />);

  return (
    <Marker
      key={index}
      icon={L.divIcon({
        className: "",
        html: icon,
        iconSize: [52, 52],
        iconAnchor: [26, 52],
        popupAnchor: [0, -46],
      })}
      position={marker.position}
    >
      <Popup>{marker.popupContent}</Popup>
    </Marker>
  );
}

export type { TMarker };
export default MapMarker;

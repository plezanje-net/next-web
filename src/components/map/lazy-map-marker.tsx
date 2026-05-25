"use client";

import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { ReactNode } from "react";
import { useClientRenderToString } from "@/hooks/useClientRenderToString";
import IconMarkerWall from "../ui/icons/marker-wall";
import IconMarkerParking from "../ui/icons/marker-parking";
import { IconSize } from "../ui/icons/icon-size";

type TLazyMapMarkerProps = {
  type: "parking" | "wall";
  position: [number, number];
  popupContent?: ReactNode;
  interactive?: boolean;
  hidden?: boolean;
};

function LazyMapMarker({
  type,
  position,
  popupContent,
  interactive = true,
  hidden,
}: TLazyMapMarkerProps) {
  const [icon] = useClientRenderToString(
    type === "parking" ? (
      <IconMarkerParking size={IconSize.xl} />
    ) : (
      <IconMarkerWall size={IconSize.xl} />
    )
  );

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
      opacity={hidden ? 0 : 1}
    >
      {popupContent && <Popup>{popupContent}</Popup>}
    </Marker>
  );
}

export default LazyMapMarker;
export type { TLazyMapMarkerProps };

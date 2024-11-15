import { useMapEvent } from "react-leaflet";
import MapMarker from "../map/map-marker";
import { Dispatch, SetStateAction } from "react";
import dynamic from "next/dynamic";

type TPlacedMarkerProps = {
  position: [number, number] | undefined;
  setPosition: Dispatch<SetStateAction<[number, number] | undefined>>;
  markerType: "wall" | "parking";
};

export default function PlacedMarker({
  position,
  setPosition,
  markerType,
}: TPlacedMarkerProps) {
  useMapEvent("click", (e) => {
    setPosition([e.latlng.lat, e.latlng.lng]);
  });

  return (
    position && (
      <MapMarker type={markerType} position={position} interactive={false} />
    )
  );
}

"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import L, { FitBoundsOptions } from "leaflet";
import "leaflet/dist/leaflet.css";
import { ReactNode } from "react";
import "./map.css";
import MapMarker from "./map-marker";
import { TLazyMapMarkerProps } from "./lazy-map-marker";

type TLazyMapProps = {
  children?: ReactNode;
  markersData?: TLazyMapMarkerProps[];
  className?: string;
  center?: [number, number];
  zoom?: number;
  autoBounds?: boolean;
  scrollWheelZoom?: boolean;
};

function LazyMap({
  children,
  markersData,
  className,
  center,
  zoom,
  autoBounds,
  scrollWheelZoom = false,
}: TLazyMapProps) {
  let mapClassName = "h-[600px] w-full cursor-loading";
  if (className) {
    mapClassName = `${mapClassName} ${className}`;
  }

  // if autoBounds is set to true, then use map markers to determine zoom and center (so that all markes are visible)
  // otherwise use the passed in center and zoom
  const boundsOrCenterAndZoom: {
    center?: [number, number];
    bounds?: L.LatLngBoundsExpression;
    boundsOptions?: FitBoundsOptions;
    zoom?: number;
  } = {};

  if (autoBounds && markersData) {
    boundsOrCenterAndZoom.bounds = markersData.map(({ position }) => position);
    boundsOrCenterAndZoom.boundsOptions = { padding: [30, 60] };
  } else {
    boundsOrCenterAndZoom.center = center;
    boundsOrCenterAndZoom.zoom = zoom;
  }

  return (
    <MapContainer
      {...boundsOrCenterAndZoom}
      scrollWheelZoom={scrollWheelZoom}
      className={mapClassName}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {markersData?.map(({ type, position, popupContent }, index) => (
        <MapMarker
          key={index}
          type={type}
          position={position}
          popupContent={popupContent}
        />
      ))}

      {children}
    </MapContainer>
  );
}

export type { TLazyMapProps };
export default LazyMap;

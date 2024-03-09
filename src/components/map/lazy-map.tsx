"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import L, { FitBoundsOptions } from "leaflet";
import "leaflet/dist/leaflet.css";
import { ReactNode } from "react";
import "./map.css";
import React from "react";
import MapMarker, { TMarker } from "./map-marker";

type TLazyMapProps = {
  children?: ReactNode;
  markers?: TMarker[];
  className?: string;
  center?: [number, number];
  zoom?: number;
  autoBounds?: boolean;
};

function LazyMap({
  children,
  markers,
  className,
  center,
  zoom,
  autoBounds,
}: TLazyMapProps) {
  let mapClassName = "h-[600px] w-full xs:rounded-lg";
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
  if (autoBounds && markers) {
    boundsOrCenterAndZoom.bounds = markers.map((marker) => marker.position);
    boundsOrCenterAndZoom.boundsOptions = { padding: [30, 60] };
  } else {
    boundsOrCenterAndZoom.center = center;
    boundsOrCenterAndZoom.zoom = zoom;
  }

  return (
    <MapContainer
      {...boundsOrCenterAndZoom}
      scrollWheelZoom={false}
      className={mapClassName}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {markers?.map((marker, index) => (
        <MapMarker key={index} marker={marker} index={index} />
      ))}

      {children}
    </MapContainer>
  );
}

export type { TLazyMapProps };
export default LazyMap;

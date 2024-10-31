"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import L, { FitBoundsOptions } from "leaflet";
import "leaflet/dist/leaflet.css";
import { Fragment, ReactElement, ReactNode } from "react";
import "./map.css";

type TLazyMapProps = {
  children?: ReactNode;
  markers?: ReactElement[];
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
  if (autoBounds && markers) {
    boundsOrCenterAndZoom.bounds = markers.map(
      (marker) => marker.props.position
    );
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
        <Fragment key={index}>{marker}</Fragment>
      ))}

      {children}
    </MapContainer>
  );
}

export type { TLazyMapProps };
export default LazyMap;

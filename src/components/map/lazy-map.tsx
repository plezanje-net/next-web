"use client";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import ReactDOMServer from "react-dom/server";
import IconMarker from "../ui/icons/marker";
import { ReactNode } from "react";
import "./map.css";

interface MapProps {
  children: ReactNode;
  markers?: {
    type: "parking" | "wall";
    position: [number, number];
    popupContent?: string;
  }[];
  className?: string;
  center: [number, number];
  zoom: number;
}

function LazyMap({ children, markers, className, center, zoom }: MapProps) {
  let mapClassName = "h-[600px] w-full rounded-lg";
  if (className) {
    mapClassName = `${mapClassName} ${className}`;
  }

  return (
    <MapContainer
      className={mapClassName}
      center={center}
      zoom={zoom}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {markers?.map((marker, index) => (
        <Marker
          key={index}
          icon={L.divIcon({
            className: "",
            html: ReactDOMServer.renderToString(
              <IconMarker type={marker.type} />
            ),
            iconSize: [48, 48],
            iconAnchor: [24, 48],
            popupAnchor: [0, -36],
          })}
          position={marker.position}
        >
          <Popup>{marker.popupContent}</Popup>
        </Marker>
      ))}

      {children}
    </MapContainer>
  );
}

export type { MapProps };
export default LazyMap;

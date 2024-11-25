import dynamic from "next/dynamic";
import { TLazyMapMarkerProps as TMapMarkerProps } from "./lazy-map-marker";

const LazyMapMarker = dynamic(() => import("./lazy-map-marker"), {
  ssr: false,
});

function MapMarker(props: TMapMarkerProps) {
  return <LazyMapMarker {...props} />;
}

export default MapMarker;

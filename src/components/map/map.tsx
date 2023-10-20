import dynamic from "next/dynamic";
import { TLazyMapProps as TMapProps } from "./lazy-map";

const LazyMap = dynamic(() => import("./lazy-map"), {
  ssr: false,
});

function Map({ className, ...rest }: TMapProps) {
  // prevent layout shift by placing classes onto a wrapper so that space is 'reserved' until the map loads
  let mapClassName = "h-[600px] w-full xs:rounded-lg";
  if (className) {
    mapClassName = `${mapClassName} ${className}`;
  }

  return (
    <div className={mapClassName}>
      <LazyMap className={mapClassName} {...rest} />
    </div>
  );
}
export default Map;

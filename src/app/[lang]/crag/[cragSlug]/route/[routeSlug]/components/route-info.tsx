import Grade from "@/components/grade";
import { Route } from "@/graphql/generated";
import RouteInfoRow from "./route-info/route-info-row";
import RouteStarRating from "@/components/route-star-rating";
import { IconSize } from "@/components/ui/icons/icon-size";

type TRouteInfoProps = {
  route: Route;
};

function RouteInfo({ route }: TRouteInfoProps) {
  const { sector } = route;

  return (
    <table className="w-full">
      <tbody>
        {route.difficulty && (
          <RouteInfoRow label="Težavnost">
            <Grade difficulty={route.difficulty} />
          </RouteInfoRow>
        )}
        {route.length && (
          <RouteInfoRow label="Dolžina">{route.length}m</RouteInfoRow>
        )}
        {route.starRating && (
          <RouteInfoRow label="Lepota">
            <RouteStarRating route={route} size={IconSize.small} showText />
          </RouteInfoRow>
        )}
        {(sector.name || sector.label) && (
          <RouteInfoRow label="Sektor">
            {[sector.label, sector.name]
              .filter((part) => part != "")
              .join(" - ")}
          </RouteInfoRow>
        )}
        <RouteInfoRow label="Plezališče">{route.crag.name}</RouteInfoRow>
        <RouteInfoRow label="Država">{route.crag.country.name}</RouteInfoRow>

        {route.properties.map(
          ({ propertyType, stringValue, textValue, numValue }) => (
            <RouteInfoRow key={propertyType.id} label={propertyType.name}>
              {stringValue || textValue || numValue}
            </RouteInfoRow>
          )
        )}

        <RouteInfoRow label="Št. uspešnih vzponov">
          {route.nrTicks}
        </RouteInfoRow>
        <RouteInfoRow label="Št. poskusov">{route.nrTries}</RouteInfoRow>
        <RouteInfoRow label="Št. plezalcev">{route.nrClimbers}</RouteInfoRow>
      </tbody>
    </table>
  );
}

export default RouteInfo;

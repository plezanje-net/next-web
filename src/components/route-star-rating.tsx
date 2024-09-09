import { Route } from "@/graphql/generated";
import { IconSize } from "./ui/icons/icon-size";
import IconStarEmpty from "./ui/icons/star-empty";
import IconStarFull from "./ui/icons/star-full";

type TRouteStarRatingProps = {
  route: Route;
  size: IconSize.small | IconSize.regular;
  showText?: boolean;
};

function RouteStarRating({ route, size, showText }: TRouteStarRatingProps) {
  return (
    <>
      {route.starRating == 2 && (
        <div className="flex">
          <IconStarFull size={size} /> {showText && "Čudovita"}
        </div>
      )}
      {route.starRating == 1 && (
        <div className="flex">
          <IconStarEmpty size={size} /> {showText && "Lepa"}
        </div>
      )}
    </>
  );
}

export default RouteStarRating;

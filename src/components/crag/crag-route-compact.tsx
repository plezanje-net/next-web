import { Route } from "../../graphql/generated";
import Grade from "../grade";
import Checkbox from "../ui/checkbox";
import IconStarEmpty from "../ui/icons/star-empty";
import IconStarFull from "../ui/icons/star-full";
import RouteStarRating from "./route-star-rating";

interface Props {
  route: Route;
}

function CragRouteCompact({ route }: Props) {
  return (
    <div
      aria-label={route.name}
      className="mt-2 flex items-center border-b border-neutral-200 pb-2 last:border-none"
    >
      <div className="pl-4 pr-3">
        <Checkbox aria-label="Označi kot preplezano" />
      </div>
      <div className="w-full pr-4">
        <div className="flex justify-between font-medium">
          <RouteStarRating route={route} />
        </div>
        <div>
          {route.difficulty && (
            <span className="pr-2">
              <Grade difficulty={route.difficulty} />
            </span>
          )}
          {route.length && <span>{route.length} m</span>}
        </div>
      </div>
    </div>
  );
}

export default CragRouteCompact;

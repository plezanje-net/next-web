import { useContext } from "react";
import { Crag, Route } from "@/graphql/generated";
import RouteLink from "@/components/route-link";
import AscentIcon from "@/components/ui/ascent-icon";
import { IconSize } from "@/components/ui/icons/icon-size";
import IconComment from "@/components/ui/icons/comment";
import IconStarEmpty from "@/components/ui/icons/star-empty";
import IconStarFull from "@/components/ui/icons/star-full";
import Link from "@/components/ui/link";
import { CragRoutesContext } from "../../crag-routes";
import { pluralizeNoun } from "@/utils/text-helpers";
import RouteGrade from "./crag-route/route-grade";
import Checkbox from "@/components/ui/checkbox";
import RouteStarRating from "@/components/route-star-rating";

interface Props {
  crag: Crag;
  route: Route;
  ascent?: string | null;
}

function CragRoute({ crag, route, ascent }: Props) {
  const { cragRoutesState, checkedRoutes, setCheckedRoute } =
    useContext(CragRoutesContext);

  const displayColumn = (name: string) =>
    cragRoutesState.selectedColumns.includes(name);

  return (
    <tr
      aria-label={route.name}
      className="border-b border-neutral-200 last:border-none"
    >
      {/* # (checkbox) */}
      <td>
        <Checkbox
          label="Označi kot plezano"
          hideLabel
          checked={checkedRoutes.some((r) => r.id == route.id)}
          onChange={(c) => setCheckedRoute(route.id, c)}
        />
      </td>

      {/* Route name */}
      <td className="py-4 pl-0 pr-4">
        <RouteLink
          className="[overflow-wrap:anywhere]"
          route={route}
          crag={crag}
        />
      </td>

      {/* Route difficulty */}
      {displayColumn("difficulty") && (
        <td className="p-4">
          <RouteGrade route={route} crag={crag} />
        </td>
      )}

      {/* Route length */}
      {displayColumn("length") && (
        <td className="p-4">{route.length && `${route.length} m`}</td>
      )}

      {/* Route's sector */}
      {cragRoutesState.combine && (
        <td className="p-4">
          {[route.sector.label, route.sector.name]
            .filter((part) => part != "")
            .join(" - ")}
        </td>
      )}

      {/* Number of successfull ascents of a route */}
      {displayColumn("nrTicks") && <td className="p-4">{route.nrTicks}</td>}

      {/* Number of all ascents of a route */}
      {displayColumn("nrTries") && <td className="p-4">{route.nrTries}</td>}

      {/* Number of different climbers ticked/tried a route */}
      {displayColumn("nrClimbers") && (
        <td className="p-4">{route.nrClimbers}</td>
      )}

      {/* Route star rating */}
      {displayColumn("starRating") && (
        <td className="p-4">
          <RouteStarRating route={route} size={IconSize.regular} />
        </td>
      )}

      {/* Does a route have any comments */}
      {displayColumn("comments") && (
        <td className="p-4">
          <RouteComments route={route} size={IconSize.regular} />
        </td>
      )}

      {/* Logged in user's acents of a route */}
      {displayColumn("myAscents") && (
        <td className="py-4 pl-4 pr-0 text-center">
          {ascent && <AscentIcon ascent={ascent} size={IconSize.regular} />}
        </td>
      )}
    </tr>
  );
}

function CragRouteCompact({ crag, route, ascent }: Props) {
  const { cragRoutesState, checkedRoutes, setCheckedRoute } =
    useContext(CragRoutesContext);

  const displayColumn = (name: string) =>
    cragRoutesState.selectedColumns.includes(name);

  const statsText = Object.entries({
    nrTicks: pluralizeNoun("uspešen vzpon", route.nrTicks!),
    nrClimbers: pluralizeNoun("plezalec", route.nrClimbers!),
    nrTries: pluralizeNoun("poskus", route.nrTries!),
  })
    .filter(([key, _]) => displayColumn(key))
    .map(([_, value]) => value)
    .join(", ");

  return (
    <div
      aria-label={route.name}
      className="mt-2 flex items-center border-b border-neutral-200 pb-2 last:border-none"
    >
      <div className="w-7">
        <Checkbox
          label="Označi kot plezano"
          hideLabel
          checked={checkedRoutes.some((r) => r.id == route.id)}
          onChange={(c) => setCheckedRoute(route.id, c)}
        />
      </div>
      <div className="w-full pr-4">
        <div className="flex justify-between font-medium">
          <RouteLink route={route} crag={crag} />
          {displayColumn("starRating") && (
            <RouteStarRating route={route} size={IconSize.small} />
          )}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex">
            {displayColumn("difficulty") && (
              <div className="-m-1 pr-4">
                <RouteGrade route={route} crag={crag} />
              </div>
            )}
            {displayColumn("length") && !!route.length && (
              <span>{route.length} m</span>
            )}
          </div>
          <div className="flex space-x-4">
            {displayColumn("comments") && (
              <RouteComments route={route} size={IconSize.small} />
            )}
            {displayColumn("myAscents") && ascent && (
              <AscentIcon ascent={ascent} size={IconSize.small} />
            )}
          </div>
        </div>
        {cragRoutesState.combine && (
          <div className="text-sm">
            v sektorju
            {` ${route.sector.label}${
              route.sector.label && route.sector.name && " - "
            }${route.sector.name}`}
          </div>
        )}
        {statsText && <div className="text-sm">{statsText}</div>}
        {!statsText != !cragRoutesState.combine && <div className="pb-1"></div>}
      </div>
    </div>
  );
}

interface RouteCommentsProps {
  route: Route;
  size: IconSize.small | IconSize.regular;
}

function RouteComments({ route, size }: RouteCommentsProps) {
  return (
    <>
      {route.comments.length > 0 && (
        <Link href={`/route/${route.id}/comments`} variant="secondary">
          <IconComment size={size} />
        </Link>
      )}
    </>
  );
}

export default CragRoute;
export { CragRouteCompact };

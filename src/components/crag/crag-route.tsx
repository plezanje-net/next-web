import { useContext } from "react";
import { Route } from "../../graphql/generated";
import Grade from "../grade";
import Checkbox from "../ui/checkbox";
import IconStarEmpty from "../ui/icons/star-empty";
import IconStarFull from "../ui/icons/star-full";
import { CragTableContext } from "./crag-table";

interface Props {
  route: Route;
}

function CragRoute({ route }: Props) {
  const { state } = useContext(CragTableContext);
  const displayColumn = (name: string) => state.selectedColumns.includes(name);
  return (
    <tr
      aria-label={route.name}
      className="border-b border-neutral-200 last:border-none"
    >
      <td>
        <Checkbox aria-label="Označi kot preplezano" />
      </td>
      <td>{route.name}</td>
      {displayColumn("difficulty") && (
        <td>
          <RouteGrade route={route} />
        </td>
      )}
      {displayColumn("length") && (
        <td>{route.length && `${route.length} m`}</td>
      )}
      {displayColumn("nrTicks") && <td>{route.nrTicks}</td>}
      {displayColumn("nrTries") && <td>{route.nrTries}</td>}
      {displayColumn("nrClimbers") && <td>{route.nrClimbers}</td>}
      {displayColumn("starRating") && (
        <td>
          <RouteStarRating route={route} />
        </td>
      )}
      {displayColumn("comments") && <td></td>}
      {displayColumn("myAscents") && <td></td>}
    </tr>
  );
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

interface RouteGradeProps {
  route: Route;
}

function RouteGrade({ route }: RouteGradeProps) {
  return (
    <>
      {route.isProject && "P"}
      {route.difficulty && <Grade difficulty={route.difficulty} />}
    </>
  );
}

interface RouteStarRatingProps {
  route: Route;
}

function RouteStarRating({ route }: RouteStarRatingProps) {
  return (
    <>
      {route.starRating == 2 && <IconStarFull />}
      {route.starRating == 1 && <IconStarEmpty />}
    </>
  );
}

export default CragRoute;
export { CragRouteCompact };

import { useContext } from "react";
import { Crag, Route } from "../../../../graphql/generated";
import Grade from "../../../grade";
import RouteLink from "../../../route-link";
import AscentIcon from "../../../ui/ascent-icon";
import Checkbox from "../../../ui/checkbox";
import IconComment from "../../../ui/icons/comment";
import { IconSize } from "../../../ui/icons/icon";
import IconStarEmpty from "../../../ui/icons/star-empty";
import IconStarFull from "../../../ui/icons/star-full";
import Link from "../../../ui/link";
import { CragRoutesContext } from "../../crag-routes";

interface Props {
  crag: Crag;
  route: Route;
  ascent?: string | null;
}

function CragRoute({ crag, route, ascent }: Props) {
  const { cragRoutesState } = useContext(CragRoutesContext);
  const displayColumn = (name: string) =>
    cragRoutesState.selectedColumns.includes(name);
  return (
    <tr
      aria-label={route.name}
      className="border-b border-neutral-200 last:border-none"
    >
      <td>
        <Checkbox aria-label="Označi kot preplezano" />
      </td>
      <td className="py-4">
        <RouteLink route={route} crag={crag} />
      </td>
      {displayColumn("difficulty") && (
        <td className="py-4">
          <RouteGrade route={route} />
        </td>
      )}
      {displayColumn("length") && (
        <td className="py-4">{route.length && `${route.length} m`}</td>
      )}
      {displayColumn("nrTicks") && <td className="py-4">{route.nrTicks}</td>}
      {displayColumn("nrTries") && <td className="py-4">{route.nrTries}</td>}
      {displayColumn("nrClimbers") && (
        <td className="py-4">{route.nrClimbers}</td>
      )}
      {displayColumn("starRating") && (
        <td className="py-4">
          <RouteStarRating route={route} />
        </td>
      )}
      {displayColumn("comments") && (
        <td className="py-4">
          <RouteComments route={route} />
        </td>
      )}
      {displayColumn("myAscents") && (
        <td className="py-4">{ascent && <AscentIcon ascent={ascent} />}</td>
      )}
    </tr>
  );
}

function CragRouteCompact({ crag, route, ascent }: Props) {
  const { cragRoutesState } = useContext(CragRoutesContext);
  const displayColumn = (name: string) =>
    cragRoutesState.selectedColumns.includes(name);

  const statsText = Object.entries({
    nrTicks: `${route.nrTicks} uspešnih vzponov`,
    nrClimbers: `${route.nrClimbers} plezalcev`,
    nrTries: `${route.nrTries} poskusov`,
  })
    .filter(([key, _]) => displayColumn(key))
    .map(([_, value]) => value)
    .join(", ");

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
          <RouteLink route={route} crag={crag} />
          <RouteStarRating route={route} size="small" />
        </div>
        <div className="flex items-center justify-between">
          <div>
            {route.difficulty && (
              <span className="pr-4">
                <Grade difficulty={route.difficulty} />
              </span>
            )}
            {route.length && <span>{route.length} m</span>}
          </div>
          <div className="flex space-x-4">
            <RouteComments route={route} size="small" />
            {displayColumn("myAscents") && ascent && (
              <AscentIcon ascent={ascent} size="small" />
            )}
          </div>
        </div>
        {statsText && <div className="pb-1 text-sm">{statsText}</div>}
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
  size?: IconSize;
}

function RouteStarRating({ route, size }: RouteStarRatingProps) {
  return (
    <>
      {route.starRating == 2 && <IconStarFull size={size} />}
      {route.starRating == 1 && <IconStarEmpty size={size} />}
    </>
  );
}

interface RouteCommentsProps {
  route: Route;
  size?: IconSize;
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

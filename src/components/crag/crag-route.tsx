import { useContext } from "react";
import { Route } from "../../graphql/generated";
import Grade from "../grade";
import Checkbox from "../ui/checkbox";
import { CragTableContext } from "./crag-table";
import RouteDifficulty from "./route-difficulty";
import RouteStarRating from "./route-star-rating";

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
          <RouteDifficulty route={route} />
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

export default CragRoute;

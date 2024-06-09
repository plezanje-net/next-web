import { Crag } from "@/graphql/generated";
import Seasons from "./seasons";
import RouteTypes from "./route-types";
import WallAngles from "./wall-angles";
import GradeFromTo from "./grade-from-to";
import Orientations from "./orientations";
import Link from "@/components/ui/link";
import { useCragsContext } from "../../crags-context";

type TCragRowProps = {
  crag: Crag;
};

function CragRow({ crag }: TCragRowProps) {
  const { columns } = useCragsContext();

  return (
    <tr className="border-b border-neutral-200">
      {columns.shown.map((column, index) => {
        let cellContent;
        switch (column.name) {
          case "name":
            cellContent = (
              <Link href={`/plezalisce/${crag.slug}`} variant="secondary">
                {crag.name}
              </Link>
            );
            break;

          case "difficulty":
            cellContent = crag.minDifficulty && crag.maxDifficulty && (
              <GradeFromTo
                minDifficulty={crag.minDifficulty}
                maxDifficulty={crag.maxDifficulty}
              />
            );
            break;

          case "nrRoutes":
            cellContent = crag.nrRoutes;
            break;

          case "orientations":
            cellContent = crag.orientations && (
              <Orientations orientations={crag.orientations} />
            );
            break;

          case "approachTime":
            cellContent = crag.approachTime && <>{crag.approachTime} min</>;
            break;

          case "seasons":
            cellContent = crag.seasons && (
              <Seasons
                seasons={crag.seasons}
                align={
                  index == columns.shown.length - 1 && columns.shown.length > 1
                    ? "right"
                    : "left"
                }
              />
            );
            break;

          case "wallAngles":
            cellContent = crag.wallAngles && (
              <WallAngles
                wallAngles={crag.wallAngles}
                align={
                  index == columns.shown.length - 1 && columns.shown.length > 1
                    ? "right"
                    : "left"
                }
              />
            );
            break;

          case "rainproof":
            cellContent =
              crag.rainproof !== null && (crag.rainproof ? "da" : "ne");
            break;

          case "routeTypes":
            cellContent = (
              <RouteTypes
                hasSport={crag.hasSport}
                hasBoulder={crag.hasBoulder}
                hasMultipitch={crag.hasMultipitch}
              />
            );
            break;

          case "country":
            cellContent = crag.country.name;
            break;

          case "area":
            cellContent = crag.area?.name;
            break;
        }

        return (
          <td
            key={index}
            className={`hyphens-auto break-words p-4 [word-break:break-word] first:pl-0 last:pr-0 ${
              columns.shown.length > 1 ? "last:text-right" : ""
            }`}
          >
            {cellContent}
          </td>
        );
      })}
    </tr>
  );
}

export default CragRow;

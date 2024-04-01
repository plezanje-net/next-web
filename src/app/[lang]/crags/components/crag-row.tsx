import { Crag } from "@/graphql/generated";
import Seasons from "./seasons";
import RouteTypes from "./route-types";
import WallAngles from "./wall-angles";
import GradeFromTo from "./grade-from-to";
import Orientations from "./orientations";
import { TCragListColumn } from "./filtered-crags";
import Link from "@/components/ui/link";

type TCragRowProps = {
  crag: Crag;
  columns: TCragListColumn[];
};

function CragRow({ crag, columns }: TCragRowProps) {
  return (
    <tr className="border-b border-neutral-200 last:border-none">
      {columns.map((column, index) => {
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
                  index == columns.length - 1 && columns.length > 1
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
                  index == columns.length - 1 && columns.length > 1
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
              columns.length > 1 ? "last:text-right" : ""
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

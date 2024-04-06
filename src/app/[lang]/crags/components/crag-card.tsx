import { IconSize } from "@/components/ui/icons/icon-size";
import IconOrientation from "@/components/ui/icons/orientation";
import IconRainproof from "@/components/ui/icons/rainproof";
import IconWalk from "@/components/ui/icons/walk";
import Link from "@/components/ui/link";
import { Crag } from "@/graphql/generated";
import Seasons from "./seasons";
import RouteTypes from "./route-types";
import WallAngles from "./wall-angles";
import GradeFromTo from "./grade-from-to";
import Orientations from "./orientations";
import { TCragListColumn } from "./filtered-crags";

type TCragCardProps = {
  crag: Crag;
  columns: TCragListColumn[];
};

function CragCard({ crag, columns }: TCragCardProps) {
  const showOrientations =
    !!columns.find((column) => column.name == "orientations") &&
    !!crag.orientations;
  const showArea =
    !!columns.find((column) => column.name == "area") && !!crag.area;
  const showCountry = !!columns.find((column) => column.name == "country");
  const showRouteTypes = !!columns.find(
    (column) => column.name == "routeTypes"
  );
  const showNrRoutes = !!columns.find((column) => column.name == "nrRoutes");
  const showDifficulty =
    !!columns.find((column) => column.name == "difficulty") &&
    !!crag.minDifficulty &&
    !!crag.maxDifficulty;
  const showApproachTime =
    !!columns.find((column) => column.name == "approachTime") &&
    !!crag.approachTime;
  const showSeasons =
    !!columns.find((column) => column.name == "seasons") && !!crag.seasons;
  const showWallAngles =
    !!columns.find((column) => column.name == "wallAngles") &&
    !!crag.wallAngles;
  const showRainproof =
    !!columns.find((column) => column.name == "rainproof") &&
    crag.rainproof != null;

  return (
    <div className="border-t border-neutral-200 px-4 py-4 last:border-b xs:px-8 md:px-0">
      {/* row 1 */}
      <div className="flex items-center justify-between">
        <div className="font-medium">
          <Link href={`/plezalisce/${crag.slug}`} variant="secondary">
            {crag.name}
          </Link>
        </div>

        {showOrientations && (
          <div className="flex items-center justify-end">
            <IconOrientation size={IconSize.small} />
            <div className="ml-1">
              <Orientations orientations={crag.orientations || []} />
            </div>
          </div>
        )}
      </div>

      {/* row 2 */}
      <div>
        {[
          ...(showArea ? [crag.area?.name] : []),
          ...(showCountry ? [crag.country.name] : []),
        ].join(", ")}
      </div>

      {/* row 3 */}
      <div className="text-sm">
        {showRouteTypes && (
          <>
            <RouteTypes
              hasSport={crag.hasSport}
              hasBoulder={crag.hasBoulder}
              hasMultipitch={crag.hasMultipitch}
            />

            {(showNrRoutes || showDifficulty) && ", "}
          </>
        )}

        {showNrRoutes && `${crag.nrRoutes} smeri`}

        {showDifficulty && (
          <>
            {showNrRoutes && " "}
            <GradeFromTo
              minDifficulty={crag.minDifficulty as number}
              maxDifficulty={crag.maxDifficulty as number}
            />
          </>
        )}
      </div>

      {/* row 4 - icons */}
      {(showApproachTime || showSeasons || showWallAngles || showRainproof) && (
        <div className="mt-2 flex items-center text-sm font-medium">
          {/* Approach time */}
          {showApproachTime && (
            <>
              <IconWalk size={IconSize.small} />
              <div className="ml-px">{crag.approachTime} min</div>
            </>
          )}

          {/* Best seasons */}
          {showSeasons && (
            <>
              {showApproachTime && (
                <div className="ml-2 h-5 border-l border-neutral-200 pl-2"></div>
              )}
              <Seasons seasons={crag.seasons || []} />
            </>
          )}

          {/* Wall angles */}
          {showWallAngles && (
            <>
              {(showApproachTime || showSeasons) && (
                <div className="ml-2 h-5 border-l border-neutral-200 pl-2"></div>
              )}

              <WallAngles wallAngles={crag.wallAngles || []} />
            </>
          )}

          {/* Rainproof */}
          {showRainproof && (
            <>
              {(showApproachTime || showSeasons || showWallAngles) && (
                <div className="ml-2 h-5 border-l border-neutral-200 pl-2"></div>
              )}

              <div className={crag.rainproof ? "" : "text-neutral-200"}>
                <IconRainproof size={IconSize.small} />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default CragCard;

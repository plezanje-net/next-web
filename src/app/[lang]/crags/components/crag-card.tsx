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

type TCragCardProps = {
  crag: Crag;
};

function CragCard({ crag }: TCragCardProps) {
  return (
    <div className="border-b border-neutral-200 py-4">
      {/* row 1 */}
      <div className="flex items-center justify-between">
        <div className="font-medium">
          <Link href={`/plezalisce/${crag.slug}`} variant="secondary">
            {crag.name}
          </Link>
        </div>

        {crag.orientations && (
          <div className="flex items-center justify-end">
            <IconOrientation size={IconSize.small} />
            <div className="ml-1">
              <Orientations orientations={crag.orientations} />
            </div>
          </div>
        )}
      </div>

      {/* row 2 */}
      <div>
        {crag.area && <>{crag.area.name}, </>}
        {crag.country.name}
      </div>

      {/* row 3 */}
      <div className="text-sm">
        <RouteTypes
          hasSport={crag.hasSport}
          hasBoulder={crag.hasBoulder}
          hasMultipitch={crag.hasMultipitch}
        />

        {`, ${crag.nrRoutes} smeri`}

        {crag.minDifficulty && crag.maxDifficulty && (
          <>
            {" "}
            <GradeFromTo
              minDifficulty={crag.minDifficulty}
              maxDifficulty={crag.maxDifficulty}
            />
          </>
        )}
      </div>

      {/* row 4 - icons */}
      <div className="mt-2 flex items-center text-sm font-medium">
        {/* Approach time */}
        {crag.approachTime && (
          <>
            <IconWalk size={IconSize.small} />
            <div className="ml-px">{crag.approachTime} min</div>
          </>
        )}

        {/* Best seasons */}
        {crag.seasons && (
          <>
            {crag.approachTime && (
              <div className="ml-2 h-5 border-l border-neutral-200 pl-2"></div>
            )}
            <Seasons seasons={crag.seasons} />
          </>
        )}

        {/* Wall angles */}
        {crag.wallAngles && (
          <>
            {(crag.approachTime || crag.seasons) && (
              <div className="ml-2 h-5 border-l border-neutral-200 pl-2"></div>
            )}

            <WallAngles wallAngles={crag.wallAngles} />
          </>
        )}

        {/* Rainproof */}
        {crag.rainproof !== null && (
          <>
            {(crag.approachTime || crag.seasons || crag.wallAngles) && (
              <div className="ml-2 h-5 border-l border-neutral-200 pl-2"></div>
            )}

            <div className={crag.rainproof ? "" : "text-neutral-200"}>
              <IconRainproof size={IconSize.small} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CragCard;

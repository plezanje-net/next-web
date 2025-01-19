import AscentType from "@/components/ascent-type";
import Grade from "@/components/grade";
import Button from "@/components/ui/button";
import { IconSize } from "@/components/ui/icons/icon-size";
import IconMore from "@/components/ui/icons/more";
import { ActivityRoute } from "@/graphql/generated";
import displayDate from "@/lib/display-date";
import { useAscentsContext } from "../../lib/ascents-context";

type TAscentCardProps = {
  ascent: ActivityRoute;
};

function AscentCard({ ascent }: TAscentCardProps) {
  const { columns } = useAscentsContext();

  const showRoute = columns.selectedState.includes("route");
  const showCrag = columns.selectedState.includes("crag");
  const showDifficulty = columns.selectedState.includes("difficulty");
  const showAscentType = columns.selectedState.includes("ascentType");
  const showNotes = columns.selectedState.includes("notes");
  const showVisibility = columns.selectedState.includes("visibility");

  return (
    <div className="px-4 py-2 border-b border-b-neutral-200">
      <div className="flex flex-row items-center">
        <div className="flex-1 text-neutral-500">
          {displayDate(ascent.date)}
        </div>
        <span className="-m-1">
          <Button variant="quaternary">
            <IconMore size={IconSize.small} />
          </Button>
        </span>
      </div>
      {(showRoute || showDifficulty || showAscentType) && (
        <div className="flex flex-row items-center gap-4">
          {showRoute && (
            <a href="#" className="flex-1 font-medium">
              {ascent.route.name}
            </a>
          )}
          {showDifficulty && ascent.route.difficulty && (
            <Grade difficulty={ascent.route.difficulty} />
          )}
          {showAscentType && <AscentType type={ascent.ascentType} compact={true} iconSize={IconSize.small} />}
        </div>
      )}
      {showCrag && <div>{ascent.route.crag.name}</div>}
      {showVisibility && (
        <div className={`${ascent.publish != "public" && "text-neutral-400"}`}>
          vidnost:{" "}
          {ascent.publish == "public"
            ? "javno"
            : ascent.publish == "club"
              ? "klub in prijatelji"
              : "samo zame"}
        </div>
      )}
      {showNotes && ascent.notes && (
        <div className="flex flex-row gap-1">
          <div>opombe:</div>
          <div>{ascent.notes}</div>
        </div>
      )}
    </div>
  );
}

export default AscentCard;

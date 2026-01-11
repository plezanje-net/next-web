import IconDot from "./ui/icons/dot";
import { IconSize } from "./ui/icons/icon-size";

type TActivityTypeProps = {
  variant: "icon" | "text" | "full";
  iconSize?: IconSize.small | IconSize.regular;
  activityType: string;
};

type TActivityType = {
  label: string;
  color: string;
};

const activityTypes: Record<string, TActivityType> = {
  crag: { label: "Skala", color: "text-blue-500" },
  climbingGym: { label: "Plastika", color: "text-blue-200" },
  trainingGym: { label: "Telovadnica", color: "text-red-100" },
  peak: { label: "Hribi", color: "text-neutral-400" },
  iceFall: { label: "Slap", color: "text-neutral-400" },
  other: { label: "Ostalo", color: "text-neutral-400" },
};

function ActivityType({ activityType, variant, iconSize }: TActivityTypeProps) {
  const option = activityTypes[activityType];

  const inner = (
    <>
      {variant != "text" && (
        <span className={`${option.color} flex`}>
          <IconDot size={iconSize ?? IconSize.small} />
        </span>
      )}
      {variant != "icon" && <span>{option.label}</span>}
    </>
  );

  return variant == "full" ? (
    <div className="flex items-center gap-1">{inner}</div>
  ) : (
    inner
  );
}

export default ActivityType;

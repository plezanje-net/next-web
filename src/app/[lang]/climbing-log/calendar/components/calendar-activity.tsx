import Grade from "@/components/grade";
import IconDot from "@/components/ui/icons/dot";
import { IconSize } from "@/components/ui/icons/icon-size";
import { Activity, ActivityRoute, Route } from "@/graphql/generated";
import activityTypes from "@/utils/constants/activity-types";
import { useMemo } from "react";

type TCalendarActivityProps = {
  activity: Activity;
};

function CalendarActivity({ activity }: TCalendarActivityProps) {
  const hardestRoute = activity.routes.reduce(
    (acc: ActivityRoute | null, route: ActivityRoute) => {
      if (route.route.difficulty == null) return acc;
      if (
        !["redpoint", "flash", "onsight", "repeat"].includes(route.ascentType)
      )
        return acc;
      if (acc == null) return route;

      return acc.route.difficulty &&
        route.route.difficulty < acc.route.difficulty
        ? acc
        : route;
    },
    null
  );

  const activityType = useMemo(() => activityTypes[activity.type], [activity]);

  return (
    <div className="flex">
      <div className={`w-3 h-3 pt-0.5 flex items-center justify-center lg:w-5 lg:h-5 text-${activityType.color}`}>
        <IconDot size={IconSize.small} />
      </div>
      <div className="hidden lg:block">
        <div>{activityType.label}</div>
        {activity.type == "crag" && activity.crag && (
          <div className="text-sm">
            <div>{activity.crag.name}</div>
            <div>{activity.routes.length} smeri</div>
            {hardestRoute && hardestRoute.route.difficulty && (
              <div>
                najtežja smer:{" "}
                <Grade
                  difficulty={hardestRoute.route.difficulty}
                  gradingSystemId={hardestRoute.route.defaultGradingSystem.id}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default CalendarActivity;

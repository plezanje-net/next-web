import ActivityType from "@/components/activity-type";
import Grade from "@/components/grade";
import { IconSize } from "@/components/ui/icons/icon-size";
import { Activity, ActivityRoute, Route } from "@/graphql/generated";

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

  return (
    <div className="flex">
      <div className="w-3 h-3 pt-0.5 flex items-center justify-center lg:w-5 lg:h-5 text-${activityType.color}">
        <ActivityType activityType={activity.type} variant="icon" iconSize={IconSize.small} />
      </div>
      <div className="hidden lg:block">
        <div><ActivityType activityType={activity.type} variant="text" /></div>
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

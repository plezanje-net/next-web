import ActivityType from "@/components/activity-type";
import AscentType from "@/components/ascent-type";
import Grade from "@/components/grade";
import Button from "@/components/ui/button";
import { IconSize } from "@/components/ui/icons/icon-size";
import IconMore from "@/components/ui/icons/more";
import { Activity } from "@/graphql/generated";

type TCalendarDayPageProps = {
  activity: Activity;
};

function CalendarDayActivity({ activity }: TCalendarDayPageProps) {
  const metersClimbed = activity.routes.reduce(
    (acc, route) => acc + (route.route.length || 0),
    0
  );

  const durationFormatted = activity.duration
    ? [
        activity.duration >= 60
          ? `${Math.floor(activity.duration / 60)}h`
          : null,
        activity.duration % 60 > 0 ? `${activity.duration % 60}min` : null,
      ]
        .filter(Boolean)
        .join(" ")
    : "";

  return (
    <div
      className={`border-t border-neutral-200 flex gap-2 ${activity.type === "crag" ? "py-3" : "py-5"}`}
    >
      <div className="pt-1">
        <ActivityType
          activityType={activity.type}
          variant="icon"
          iconSize={IconSize.regular}
        />
      </div>
      <div className="grow">
        <div className="flex items-center">
          <h4 className="grow">
            <ActivityType activityType={activity.type} variant="text" />
          </h4>
          <Button variant="quaternary">
            <IconMore size={IconSize.regular} />
          </Button>
        </div>
        <div className="pt-4">
          {activity.type === "crag" && activity.crag ? (
            <div className="grid grid-cols-[auto_1fr] gap-2 gap-y-1">
              <div>Plezališče:</div>
              <div>{activity.crag.name}</div>
              <div>Soplezalci:</div>
              <div>{activity.partners}</div>
              <div>Opombe:</div>
              <div>{activity.notes}</div>
              <div>Povzetek:</div>
              <div>
                {activity.routes.length} vzponov, {metersClimbed}m
              </div>
              <div className="pt-3 col-span-2 sm:col-auto">Vzponi:</div>
              <div className="pt-1 col-span-2 sm:col-auto">
                <div className="grid grid-cols-[1fr_auto_auto] sm:grid-cols-[auto_auto_auto_1fr_auto]">
                  {activity.routes.map((route, index) => (
                    <>
                      <div
                        className={`${index ? "border-t border-neutral-200" : ""} pr-4 sm:pr-8 pt-2 sm:py-2`}
                      >
                        {route.route.name}
                      </div>
                      <div
                        className={`${index ? "border-t border-neutral-200" : ""} pr-4 sm:pr-8 pt-2 sm:py-2`}
                      >
                        {route.route.difficulty && (
                          <Grade
                            difficulty={route.route.difficulty}
                            gradingSystemId={
                              route.route.defaultGradingSystem.id
                            }
                          />
                        )}
                      </div>
                      <div
                        className={`${index ? "border-t border-neutral-200" : ""} sm:pr-8 pt-2 sm:py-2`}
                      >
                        <span className="sm:hidden flex justify-self-end">
                          <AscentType type={route.ascentType} compact />
                        </span>
                        <span className="hidden sm:inline">
                          <AscentType type={route.ascentType} />
                        </span>
                      </div>
                      <div
                        className={`${index ? "sm:border-t border-neutral-200" : ""}${route.notes ? "" : " hidden"} sm:flex pr-8 sm:py-2 col-span-3 sm:col-auto flex gap-1 text-sm sm:text-base`}
                      >
                        <span className="sm:hidden">opomba:</span>
                        <span>{route.notes}</span>
                      </div>
                      <div
                        className={`${index ? "sm:border-t border-neutral-200" : ""} pb-2 sm:py-2.5 text-neutral-400 text-sm flex col-span-3 sm:col-auto`}
                      >
                        vidno samo meni
                      </div>
                    </>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-[auto_1fr] gap-2 gap-y-1">
              {activity.name && (
                <>
                  <div>Lokacija:</div>
                  <div>{activity.name}</div>
                </>
              )}
              {activity.duration && (
                <>
                  <div>Trajanje:</div>
                  <div>{durationFormatted}</div>
                </>
              )}
              {activity.notes && (
                <>
                  <div>Opombe:</div>
                  <div>{activity.notes}</div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CalendarDayActivity;

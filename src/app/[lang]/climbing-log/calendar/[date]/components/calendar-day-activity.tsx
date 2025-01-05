import AscentType from "@/components/ascent-type";
import Grade from "@/components/grade";
import Button from "@/components/ui/button";
import { IconSize } from "@/components/ui/icons/icon-size";
import IconMore from "@/components/ui/icons/more";
import { Activity } from "@/graphql/generated";
import activityTypes from "@/utils/constants/activity-types";

type TCalendarDayPageProps = {
  activity: Activity;
};

function CalendarDayActivity({ activity }: TCalendarDayPageProps) {
  const activityType = activityTypes[activity.type];

  const metersClimbed = activity.routes.reduce(
    (acc, route) => acc + (route.route.length || 0),
    0
  );

  return (
    <div
      className={`border-t border-neutral-200 flex gap-2 ${activity.type === "crag" ? "py-3" : "py-5"}`}
    >
      <div className="w-6 h-8 flex items-center justify-center">
        <div
          className={`w-3.5 h-3.5 bg-${activityType.color} rounded-full`}
        ></div>
      </div>
      <div className="grow">
        <div className="flex items-center">
          <h4 className="grow">{activityType.label}</h4>
          <Button variant="quaternary">
            <IconMore size={IconSize.regular} />
          </Button>
        </div>
        <div className="pt-4">
          {activity.type === "crag" && activity.crag && (
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
                        <span className="sm:hidden flex justify-self-end"><AscentType type={route.ascentType} compact /></span>
                        <span className="hidden sm:inline"><AscentType type={route.ascentType} /></span>
                      </div>
                      <div
                        className={`${index ? "sm:border-t border-neutral-200" : ""}${route.notes ? '' : ' hidden'} sm:flex pr-8 sm:py-2 col-span-3 sm:col-auto flex gap-1 text-sm sm:text-base`}
                      >
                        <span className="sm:hidden">
                          opomba:
                        </span>
                        <span>
                        {route.notes}
                        </span>
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
          )}
        </div>
      </div>
    </div>
  );
}

export default CalendarDayActivity;

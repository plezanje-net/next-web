"use client";

import { Fragment, useState } from "react";
import ActivityType from "@/components/activity-type";
import AscentType from "@/components/ascent-type";
import Grade from "@/components/grade";
import Button from "@/components/ui/button";
import { IconSize } from "@/components/ui/icons/icon-size";
import IconMore from "@/components/ui/icons/more";
import { CalendarDailyActivitiesQuery } from "@/graphql/generated";
import DropdownMenu, { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import Dialog from "@/components/ui/dialog";
import deleteActivityAction from "./lib/delete-activity-action";
import { useRouter } from "next/navigation";

type TCalendarDayPageProps = {
  activity: CalendarDailyActivitiesQuery["myActivities"]["items"][0];
};

function CalendarDayActivity({ activity }: TCalendarDayPageProps) {
  const router = useRouter();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleteActivityLoading, setIsDeleteActivityLoading] = useState(false);

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

  const handleDeleteActivity = async () => {
    setIsDeleteActivityLoading(true);
    await deleteActivityAction(activity.id);
    setIsDeleteActivityLoading(false);
    setIsDeleteDialogOpen(false);
    router.refresh();
  };

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
            <ActivityType
              activityType={activity.type}
              customType={activity.customType}
              variant="text"
            />
          </h4>
          <DropdownMenu
            openTrigger={
              <Button variant="quaternary">
                <IconMore size={IconSize.regular} />
              </Button>
            }
          >
            <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
              Izbriši aktivnost
            </DropdownMenuItem>
          </DropdownMenu>

          <Dialog
            title="Izbriši aktivnost?"
            isOpen={isDeleteDialogOpen}
            setIsOpen={setIsDeleteDialogOpen}
            confirm={{
              label: "Izbriši",
              callback: handleDeleteActivity,
              dontCloseOnConfirm: true,
              loading: isDeleteActivityLoading,
            }}
            cancel={{ label: "Prekliči" }}
          >
            <div>Si prepričan_a da želiš izbrisati aktivnost?</div>
          </Dialog>
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
                    <Fragment key={route.id || index}>
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
                    </Fragment>
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

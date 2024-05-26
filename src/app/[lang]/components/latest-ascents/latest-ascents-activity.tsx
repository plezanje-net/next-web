"use client";
import { useState } from "react";
import { Activity } from "../../../../graphql/generated";
import displayDate from "../../../../utils/display-date";
import CragLink from "../../../../components/crag-link";
import Grade from "../../../../components/grade";
import RouteLink from "../../../../components/route-link";
import IconCollapse from "@/components/ui/icons/collapse";
import IconExpand from "@/components/ui/icons/expand";

type Params = {
  activity: Activity;
};

function LatestAscentsActivity({ activity }: Params) {
  const [expanded, setExpanded] = useState(false);
  const toggleCommentsHandler = () => setExpanded(!expanded);

  return (
    <li
      className="flex items-center border-b border-b-neutral-200 py-3"
      onClick={toggleCommentsHandler}
    >
      <div className="w-6">
        {activity.routes.length > 1 ? (
          expanded ? (
            <IconCollapse />
          ) : (
            <IconExpand />
          )
        ) : (
          ""
        )}
      </div>
      <div className="flex-grow">
        <div>{displayDate(activity.date)}</div>
        <div>
          {activity.user.fullName},{" "}
          <CragLink crag={activity.routes[0].route.crag} />
        </div>
        {(expanded ? activity.routes : [activity.routes[0]]).map(
          (activityRoute) => (
            <div key={activityRoute.id} className="flex justify-between">
              <RouteLink route={activityRoute.route} />
              <Grade
                difficulty={activityRoute.route.difficulty ?? 0}
                gradingSystemId={activityRoute.route.defaultGradingSystem.id}
              />
            </div>
          )
        )}
      </div>
    </li>
  );
}

export default LatestAscentsActivity;

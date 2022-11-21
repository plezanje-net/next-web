import { useState } from "react";
import { Activity } from "../../../graphql/generated";
import displayDate from "../../../utils/display-date";
import CragLink from "../../crag-link";
import Grade from "../../grade";
import RouteLink from "../../route-link";

type Params = {
  activity: Activity;
};

function LatestAscentsActivity({ activity }: Params) {
  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = () => setExpanded(!expanded);

  return (
    <li className="border-b border-b-neutral-200 py-3" onClick={toggleExpanded}>
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
    </li>
  );
}

export default LatestAscentsActivity;

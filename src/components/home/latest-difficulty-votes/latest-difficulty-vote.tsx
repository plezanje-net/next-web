import { useState } from "react";
import { Activity, DifficultyVote } from "../../../graphql/generated";
import displayDate from "../../../utils/display-date";
import CragLink from "../../crag-link";
import Grade from "../../grade";
import RouteLink from "../../route-link";
import IconCollapse from "../../ui/icons/collapse";
import IconExpand from "../../ui/icons/expand";
import IconRight from "../../ui/icons/right";

type Params = {
  difficultyVote: DifficultyVote;
};

function LatestDifficultyVote({ difficultyVote }: Params) {
  return (
    <li className="border-b border-b-neutral-200 py-3">
      <div>{displayDate(difficultyVote.created)}</div>
      <div>{difficultyVote.user?.fullName}</div>
      <div className="flex justify-between">
        <div>
          <RouteLink route={difficultyVote.route} />,{" "}
          <CragLink crag={difficultyVote.route.crag} />
        </div>
        <div className="flex">
          <Grade
            difficulty={difficultyVote.route.difficulty ?? 0}
            gradingSystemId={difficultyVote.route.defaultGradingSystem.id}
          />
          <IconRight />
          <Grade
            difficulty={difficultyVote.difficulty ?? 0}
            gradingSystemId={difficultyVote.route.defaultGradingSystem.id}
          />
        </div>
      </div>
    </li>
  );
}

export default LatestDifficultyVote;

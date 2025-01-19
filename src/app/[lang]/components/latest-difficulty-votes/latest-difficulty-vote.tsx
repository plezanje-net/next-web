"use client";
import { useState } from "react";
import { Activity, DifficultyVote } from "@/graphql/generated";
import displayDate from "../../../../lib/display-date";
import CragLink from "@/components/crag-link";
import Grade from "@/components/grade";
import RouteLink from "@/components/route-link";
import IconCollapse from "@/components/ui/icons/collapse";
import IconExpand from "@/components/ui/icons/expand";
import IconRight from "@/components/ui/icons/right";

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

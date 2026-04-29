"use client";

import { HomeLatestDifficultyVotesQuery } from "@/graphql/generated";
import displayDate from "../../../../lib/display-date";
import CragLink from "@/components/crag-link";
import Grade from "@/components/grade";
import RouteLink from "@/components/route-link";
import IconRight from "@/components/ui/icons/right";

type TLatestDifficultyVoteProps = {
  difficultyVote: HomeLatestDifficultyVotesQuery["latestDifficultyVotes"]["items"][number];
};

function LatestDifficultyVote({ difficultyVote }: TLatestDifficultyVoteProps) {
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

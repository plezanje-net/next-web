import { useEffect, useState } from "react";
import difficultyVotesAction from "./server-actions/difficulty-votes-action";
import { DifficultyVote, Route } from "@/graphql/generated";
import displayDate from "@/utils/display-date";
import Grade, { diffToGrade } from "@/components/grade";
import { pluralizeNoun } from "@/utils/text-helpers";
import { gradingSystems } from "@/utils/grading-systems";

interface Props {
  route: Route;
  difficultyVotes: DifficultyVote[];
}

function DifficultyVotes({ route, difficultyVotes }: Props) {
  const routeGradeDifficulty = route.difficulty
    ? diffToGrade(route.difficulty, "french", false).difficulty
    : null;

  const nrVotesPerDifficulty = difficultyVotes.reduce(
    (acc, vote) => ({
      ...acc,
      [vote.difficulty]: (acc[vote.difficulty] || 0) + 1,
    }),
    {} as Record<number, number>
  );

  if (routeGradeDifficulty && !nrVotesPerDifficulty[routeGradeDifficulty]) {
    nrVotesPerDifficulty[routeGradeDifficulty] = 0;
  }

  const maxVotesPerDifficulty = Math.max(
    ...Object.values(nrVotesPerDifficulty)
  );

  return (
    <>
      <table className="w-full max-w-sm">
        <tbody>
          {Object.entries(nrVotesPerDifficulty).map(([difficulty, nrVotes]) => (
            <tr key={difficulty}>
              <td className="pr-4">
                <Grade
                  difficulty={parseInt(difficulty)}
                  displayIntermediate={true}
                />
              </td>
              <td className="w-full">
                <span
                  className={`float-left block h-5 w-0.5 ${
                    nrVotes === maxVotesPerDifficulty && "w-full"
                  } rounded ${
                    routeGradeDifficulty === parseInt(difficulty)
                      ? "bg-blue-500"
                      : "bg-neutral-200"
                  }`}
                  style={
                    nrVotes > 0
                      ? {
                          width: `${Math.round(
                            (nrVotes / maxVotesPerDifficulty) * 100
                          )}%`,
                        }
                      : {}
                  }
                ></span>
                <span className="relative float-left">
                  <span className="absolute whitespace-nowrap pl-3 align-middle text-sm">
                    {nrVotes !== maxVotesPerDifficulty &&
                      pluralizeNoun("glas", nrVotes)}
                  </span>
                </span>
              </td>
              <td className="whitespace-nowrap pl-3 align-middle text-sm">
                {nrVotes === maxVotesPerDifficulty &&
                  pluralizeNoun("glas", nrVotes)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <table className="mt-8">
        <tbody>
          {difficultyVotes.map((vote) => (
            <tr
              key={vote.id}
              className={
                vote.includedInCalculation
                  ? "text-neutral-900"
                  : "text-neutral-500"
              }
            >
              <td className="pr-4">
                <Grade
                  difficulty={vote.difficulty}
                  displayIntermediate={true}
                />
              </td>
              <td className="pr-4">
                {vote.isBase ? "(bazna ocena)" : vote.user?.fullName}
              </td>
              <td>{displayDate(vote.created)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default DifficultyVotes;

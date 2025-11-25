import {
  DifficultyVote,
  HomeLatestDifficultyVotesDocument,
} from "@/graphql/generated";
import LatestDifficultyVote from "./latest-difficulty-votes/latest-difficulty-vote";
import LatestDifficultyVoteSkeleton from "./latest-difficulty-votes/latest-difficulty-vote-skeleton";
import { gqlRequest } from "@/lib/graphql-client";

async function LatestDifficultyVotes() {
  const { latestDifficultyVotes } = await gqlRequest(
    HomeLatestDifficultyVotesDocument,
    {
      input: {
        pageSize: 10,
      },
    }
  );

  return (
    <>
      <h2>Zadnji predlogi ocen</h2>
      <ul>
        {latestDifficultyVotes?.items.map((difficultyVote, index) =>
          difficultyVote ? (
            <LatestDifficultyVote
              key={difficultyVote.id}
              difficultyVote={difficultyVote as DifficultyVote}
            />
          ) : (
            <LatestDifficultyVoteSkeleton key={index} />
          )
        )}
      </ul>
    </>
  );
}

export default LatestDifficultyVotes;

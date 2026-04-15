import {
  HomeLatestDifficultyVotesDocument,
  HomeLatestDifficultyVotesQuery,
} from "@/graphql/generated";
import LatestDifficultyVote from "./latest-difficulty-votes/latest-difficulty-vote";
import LatestDifficultyVoteSkeleton from "./latest-difficulty-votes/latest-difficulty-vote-skeleton";
import { gqlRequest } from "@/lib/gql-request";
import { gql } from "graphql-request";

async function LatestDifficultyVotes() {
  const { data } = await gqlRequest(HomeLatestDifficultyVotesDocument, {
    input: {
      pageSize: 10,
    },
  });

  const difficultyVotes: HomeLatestDifficultyVotesQuery["latestDifficultyVotes"]["items"] =
    data?.latestDifficultyVotes.items ?? Array.from(new Array(10));

  return (
    <>
      <h2>Zadnji predlogi ocen</h2>
      <ul>
        {difficultyVotes.map((difficultyVote, index) =>
          difficultyVote ? (
            <LatestDifficultyVote
              key={difficultyVote.id}
              difficultyVote={difficultyVote}
            />
          ) : (
            <LatestDifficultyVoteSkeleton key={index} />
          )
        )}
      </ul>
    </>
  );
}

gql`
  query HomeLatestDifficultyVotes($input: LatestDifficultyVotesInput!) {
    latestDifficultyVotes(input: $input) {
      items {
        id
        difficulty
        created
        route {
          id
          name
          slug
          difficulty
          defaultGradingSystem {
            id
          }
          crag {
            id
            name
            slug
          }
          publishStatus
        }
        user {
          id
          fullName
          gender
        }
      }
    }
  }
`;

export default LatestDifficultyVotes;

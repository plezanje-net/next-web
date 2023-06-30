import { gql } from "@urql/core";
import {
  DifficultyVote,
  HomeLatestDifficultyVotesDocument,
} from "../../../graphql/generated";
import LatestDifficultyVote from "./latest-difficulty-votes/latest-difficulty-vote";
import LatestDifficultyVoteSkeleton from "./latest-difficulty-votes/latest-difficulty-vote-skeleton";
import urqlServer from "../../../graphql/urql-server";

async function LatestDifficultyVotes() {
  const { data } = await urqlServer().query(HomeLatestDifficultyVotesDocument, {
    input: {
      pageSize: 10,
    },
  });

  const difficultyVotes: DifficultyVote[] =
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

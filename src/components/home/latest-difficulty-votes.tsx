import { gql } from "urql";
import { DifficultyVote } from "../../graphql/generated";

function LatestDifficultyVotes() {
  return <></>;
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

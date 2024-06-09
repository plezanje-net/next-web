"use server";

import { gql } from "urql/core";
import {
  DifficultyVote,
  RouteDifficultyVotesDocument,
} from "@/graphql/generated";
import urqlServer from "@/graphql/urql-server";

async function difficultyVotesAction(
  routeId: string
): Promise<DifficultyVote[]> {
  const result = await urqlServer().query(RouteDifficultyVotesDocument, {
    routeId,
  });

  if (result.error) {
    return Promise.reject(result.error);
  }

  return result.data.route.difficultyVotes;
}

export default difficultyVotesAction;

gql`
  query RouteDifficultyVotes($routeId: String!) {
    route(id: $routeId) {
      id
      slug
      difficulty
      defaultGradingSystem {
        id
      }
      name
      length
      difficultyVotes {
        user {
          id
          fullName
          firstname
          lastname
        }
        id
        difficulty
        created
        updated
        isBase
        includedInCalculation
      }
    }
  }
`;

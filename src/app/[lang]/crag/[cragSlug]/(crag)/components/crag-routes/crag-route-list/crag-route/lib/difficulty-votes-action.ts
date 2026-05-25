"use server";

import { gql } from "graphql-request";
import { gqlRequest } from "@/lib/gql-request";
import { RouteDifficultyVotesDocument } from "@/graphql/generated";

async function difficultyVotesAction(routeId: string) {
  const result = await gqlRequest(RouteDifficultyVotesDocument, {
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

"use server";

import {
  DifficultyVote,
  RouteDifficultyVotesDocument,
} from "@/graphql/generated";
import { gqlRequest } from "@/lib/graphql-client";

async function difficultyVotesAction(
  routeId: string
): Promise<DifficultyVote[]> {
  try {
    const { route } = await gqlRequest(RouteDifficultyVotesDocument, {
      routeId,
    });
    return route.difficultyVotes as DifficultyVote[];
  } catch (error) {
    return Promise.reject("Napaka pri pridobivanju glasov o težavnosti.");
  }
}

export default difficultyVotesAction;

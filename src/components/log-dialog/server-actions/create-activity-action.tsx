"use server";

import { gql } from "urql/core";
import urqlServer from "@/graphql/urql-server";
import {
  CreateActivityDocument,
  CreateActivityInput,
  CreateActivityRouteInput,
} from "@/graphql/generated";

async function createActivityAction(
  activity: CreateActivityInput,
  routes: CreateActivityRouteInput[]
) {
  const result = await urqlServer().mutation(CreateActivityDocument, {
    input: activity,
    routes: routes,
  });

  if (result.error) {
    throw new Error("Pri shranjevanju vzponov je prišlo do napake.");
  }

  return true;
}

export default createActivityAction;

gql`
  mutation CreateActivity(
    $input: CreateActivityInput!
    $routes: [CreateActivityRouteInput!]!
  ) {
    createActivity(input: $input, routes: $routes) {
      id
    }
  }
`;

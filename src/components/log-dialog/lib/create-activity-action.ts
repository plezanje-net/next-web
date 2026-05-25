"use server";

import { gqlRequest } from "@/lib/gql-request";
import { gql } from "graphql-request";
import {
  CreateActivityDocument,
  CreateActivityInput,
  CreateActivityRouteInput,
} from "@/graphql/generated";

async function createActivityAction(
  activity: CreateActivityInput,
  routes: CreateActivityRouteInput[]
) {
  const result = await gqlRequest(CreateActivityDocument, {
    input: activity,
    routes: routes,
  });

  await new Promise((resolve) => setTimeout(resolve, 4000));

  if (result.error) {
    console.error(result.error);
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

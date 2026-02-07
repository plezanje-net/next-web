"use server";

import {
  CreateActivityInput,
  CreateActivityRouteInput,
  DryRunCreateActivityDocument,
} from "@/graphql/generated";
import { gqlRequest } from "@/lib/gql-request";
import { gql } from "graphql-request";

async function dryRunCreateActivityAction(
  activity: CreateActivityInput,
  routes: CreateActivityRouteInput[]
) {
  const result = await gqlRequest(DryRunCreateActivityDocument, {
    input: activity,
    routes: routes,
  });

  if (result.error) {
    console.error(result.error);
    throw new Error("Pri shranjevanju vzponov je prišlo do napake.");
  }

  return result.data;
}

export default dryRunCreateActivityAction;

gql`
  query DryRunCreateActivity(
    $input: CreateActivityInput!
    $routes: [CreateActivityRouteInput!]!
  ) {
    dryRunCreateActivity(input: $input, routes: $routes) {
      before {
        date
        ascentType
        routeId
        route {
          name
        }
      }
      after {
        date
        ascentType
        routeId
      }
    }
  }
`;

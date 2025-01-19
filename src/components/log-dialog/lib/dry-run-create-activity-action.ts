"use server";

import { gql } from "urql/core";
import urqlServer from "@/graphql/urql-server";
import {
  CreateActivityInput,
  CreateActivityRouteInput,
  DryRunCreateActivityDocument,
} from "@/graphql/generated";

async function dryRunCreateActivityAction(
  activity: CreateActivityInput,
  routes: CreateActivityRouteInput[]
) {
  const result = await urqlServer().query(DryRunCreateActivityDocument, {
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

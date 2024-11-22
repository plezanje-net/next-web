"use server";

import { gql } from "urql/core";
import urqlServer from "@/graphql/urql-server";
import { UpdateRouteDocument, UpdateRouteInput } from "@/graphql/generated";

async function updateRouteAction(routeData: UpdateRouteInput) {
  const result = await urqlServer().mutation(UpdateRouteDocument, {
    input: routeData,
  });
  if (result.error) {
    console.error(result.error);
    throw new Error("Pri shranjevanju smeri je prišlo do napake.");
  }

  return result.data.updateRoute;
}

export default updateRouteAction;

gql`
  mutation UpdateRoute($input: UpdateRouteInput!) {
    updateRoute(input: $input) {
      id
    }
  }
`;

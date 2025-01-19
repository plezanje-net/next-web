"use server";

import { gql } from "urql/core";
import urqlServer from "@/graphql/urql-server";
import { UpdateRouteInput, UpdateRoutesDocument } from "@/graphql/generated";

async function updateRoutesAction(routesData: UpdateRouteInput[]) {
  const result = await urqlServer().mutation(UpdateRoutesDocument, {
    input: routesData,
  });
  if (result.error) {
    console.error(result.error);
    throw new Error("Pri shranjevanju smeri je prišlo do napake.");
  }
  return result.data.updateRoutes;
}

export default updateRoutesAction;

gql`
  mutation UpdateRoutes($input: [UpdateRouteInput!]!) {
    updateRoutes(input: $input) {
      id
    }
  }
`;

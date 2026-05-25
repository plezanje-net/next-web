"use server";

import { gql } from "graphql-request";
import { gqlRequest } from "@/lib/gql-request";
import { UpdateRouteInput, UpdateRoutesDocument } from "@/graphql/generated";

async function updateRoutesAction(routesData: UpdateRouteInput[]) {
  const result = await gqlRequest(UpdateRoutesDocument, { input: routesData });
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

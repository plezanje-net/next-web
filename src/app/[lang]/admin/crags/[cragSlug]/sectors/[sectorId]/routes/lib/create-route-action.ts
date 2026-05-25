"use server";

import { gql } from "graphql-request";
import { gqlRequest } from "@/lib/gql-request";
import { CreateRouteDocument, CreateRouteInput } from "@/graphql/generated";

async function createRouteAction(routeData: CreateRouteInput) {
  const result = await gqlRequest(CreateRouteDocument, { input: routeData });
  if (result.error) {
    console.error(result.error);
    throw new Error("Pri shranjevanju smeri je prišlo do napake.");
  }

  return result.data.createRoute;
}

export default createRouteAction;

gql`
  mutation CreateRoute($input: CreateRouteInput!) {
    createRoute(input: $input) {
      id
    }
  }
`;

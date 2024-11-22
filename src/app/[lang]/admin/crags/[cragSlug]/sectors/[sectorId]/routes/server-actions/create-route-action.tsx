"use server";

import { gql } from "urql/core";
import urqlServer from "@/graphql/urql-server";
import { CreateRouteDocument, CreateRouteInput } from "@/graphql/generated";

async function createRouteAction(routeData: CreateRouteInput) {
  const result = await urqlServer().mutation(CreateRouteDocument, {
    input: routeData,
  });
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

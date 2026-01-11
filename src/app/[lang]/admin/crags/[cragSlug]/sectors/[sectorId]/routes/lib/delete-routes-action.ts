"use server";

import { gql } from "urql/core";
import urqlServer from "@/graphql/urql-server";
import { DeleteRoutesDocument } from "@/graphql/generated";

async function deleteRoutesAction(routeIds: string[]) {
  const result = await urqlServer().mutation(DeleteRoutesDocument, {
    ids: routeIds,
  });
  if (result.error) {
    console.error(result.error);
    throw new Error("Pri brisanju smeri je prišlo do napake.");
  }

  return result.data.deleteRoutes;
}

export default deleteRoutesAction;

gql`
  mutation DeleteRoutes($ids: [String!]!) {
    deleteRoutes(ids: $ids)
  }
`;

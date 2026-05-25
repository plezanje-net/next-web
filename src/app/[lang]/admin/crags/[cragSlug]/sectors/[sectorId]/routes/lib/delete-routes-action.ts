"use server";

import { gql } from "graphql-request";
import { gqlRequest } from "@/lib/gql-request";
import { DeleteRoutesDocument } from "@/graphql/generated";

async function deleteRoutesAction(routeIds: string[]) {
  const result = await gqlRequest(DeleteRoutesDocument, { ids: routeIds });
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

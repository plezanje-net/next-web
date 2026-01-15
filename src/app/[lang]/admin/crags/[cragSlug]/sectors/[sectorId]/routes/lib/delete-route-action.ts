"use server";

import { gql } from "graphql-request";
import { gqlRequest } from "@/lib/gql-request";
import { DeleteRouteDocument } from "@/graphql/generated";

async function deleteRouteAction(routeId: string) {
  const result = await gqlRequest(DeleteRouteDocument, { id: routeId });
  if (result.error) {
    console.error(result.error);
    throw new Error("Pri brisanju smeri je prišlo do napake.");
  }

  return result.data.deleteRoute;
}

export default deleteRouteAction;

gql`
  mutation DeleteRoute($id: String!) {
    deleteRoute(id: $id)
  }
`;

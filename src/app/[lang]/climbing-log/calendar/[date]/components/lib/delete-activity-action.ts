"use server";

import { gql } from "graphql-request";
import { gqlRequest } from "@/lib/gql-request";
import { DeleteActivityDocument } from "@/graphql/generated";

async function deleteActivityAction(activityId: string) {
  const result = await gqlRequest(DeleteActivityDocument, { id: activityId });
  if (result.error) {
    console.error(result.error);
    throw new Error("Pri brisanju aktivnosti je prišlo do napake.");
  }

  return result.data.deleteActivity;
}

export default deleteActivityAction;

gql`
  mutation DeleteActivity($id: String!) {
    deleteActivity(id: $id)
  }
`;

"use server";

import { gql } from "graphql-request";
import { gqlRequest } from "@/lib/gql-request";
import { UpdateCragDocument, UpdateCragInput } from "@/graphql/generated";

async function updateCragAction(cragData: UpdateCragInput) {
  const result = await gqlRequest(UpdateCragDocument, { input: cragData });
  if (result.error) {
    console.error(result.error);
    throw new Error("Pri shranjevanju plezališča je prišlo do napake.");
  }

  return result.data.updateCrag;
}

export default updateCragAction;

gql`
  mutation UpdateCrag($input: UpdateCragInput!) {
    updateCrag(input: $input) {
      id
      slug
    }
  }
`;

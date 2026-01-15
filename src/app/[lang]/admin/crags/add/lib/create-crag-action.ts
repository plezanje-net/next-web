"use server";

import { gql } from "graphql-request";
import { gqlRequest } from "@/lib/gql-request";
import { CreateCragDocument, CreateCragInput } from "@/graphql/generated";

async function createCragAction(cragData: CreateCragInput) {
  const result = await gqlRequest(CreateCragDocument, { input: cragData });
  if (result.error) {
    console.error(result.error);
    throw new Error("Pri shranjevanju plezališča je prišlo do napake.");
  }

  return result.data.createCrag;
}

export default createCragAction;

gql`
  mutation CreateCrag($input: CreateCragInput!) {
    createCrag(input: $input) {
      id
      slug
    }
  }
`;

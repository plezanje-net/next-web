"use server";

import { gql } from "urql/core";
import urqlServer from "@/graphql/urql-server";
import { UpdateCragDocument, UpdateCragInput } from "@/graphql/generated";

async function updateCragAction(cragData: UpdateCragInput) {
  const result = await urqlServer().mutation(UpdateCragDocument, {
    input: cragData,
  });
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

"use server";

import { gql } from "urql/core";
import urqlServer from "@/graphql/urql-server";
import { CreateCragDocument, CreateCragInput } from "@/graphql/generated";

async function createCragAction(cragData: CreateCragInput) {
  const result = await urqlServer().mutation(CreateCragDocument, {
    input: cragData,
  });
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

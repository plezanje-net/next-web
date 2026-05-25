"use server";

import { gql } from "graphql-request";
import { gqlRequest } from "@/lib/gql-request";
import { MergeRoutesDocument, MergeRoutesInput } from "@/graphql/generated";

async function mergeRoutesAction(mergeRoutesData: MergeRoutesInput) {
  const result = await gqlRequest(MergeRoutesDocument, {
    input: mergeRoutesData,
  });

  if (result.error) {
    console.error(result.error);
    throw new Error("Pri združevanju smeri je prišlo do napake.");
  }

  return result.data.mergeRoutes;
}

export default mergeRoutesAction;

gql`
  mutation MergeRoutes($input: MergeRoutesInput!) {
    mergeRoutes(input: $input)
  }
`;

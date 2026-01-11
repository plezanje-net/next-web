"use server";

import { gql } from "urql/core";
import urqlServer from "@/graphql/urql-server";
import { MergeAllSectorsDocument } from "@/graphql/generated";

async function mergeSectorsIntoNoneAction(cragId: string) {
  const result = await urqlServer().mutation(MergeAllSectorsDocument, {
    cragId,
  });

  if (result.error) {
    console.error(result.error);
    throw new Error("Pri ukinjanju sektorjev je prišlo do napake.");
  }

  return result.data.mergeAllSectors;
}

export default mergeSectorsIntoNoneAction;

gql`
  mutation MergeAllSectors($cragId: String!) {
    mergeAllSectors(cragId: $cragId)
  }
`;

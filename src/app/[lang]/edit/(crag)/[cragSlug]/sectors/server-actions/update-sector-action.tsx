"use server";

import { gql } from "urql/core";
import urqlServer from "@/graphql/urql-server";
import { UpdateSectorDocument, UpdateSectorInput } from "@/graphql/generated";

async function updateSectorAction(sectorData: UpdateSectorInput) {
  const result = await urqlServer().mutation(UpdateSectorDocument, {
    input: sectorData,
  });
  if (result.error) {
    console.error(result.error);
    throw new Error("Pri shranjevanju sektorja je prišlo do napake.");
  }

  return result.data.updateSector;
}

export default updateSectorAction;

gql`
  mutation UpdateSector($input: UpdateSectorInput!) {
    updateSector(input: $input) {
      id
    }
  }
`;

"use server";

import { gql } from "graphql-request";
import { gqlRequest } from "@/lib/gql-request";
import { UpdateSectorDocument, UpdateSectorInput } from "@/graphql/generated";

async function updateSectorAction(sectorData: UpdateSectorInput) {
  const result = await gqlRequest(UpdateSectorDocument, { input: sectorData });
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

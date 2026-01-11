"use server";

import { gql } from "urql/core";
import urqlServer from "@/graphql/urql-server";
import { DeleteSectorDocument } from "@/graphql/generated";

async function deleteSectorAction(sectorId: string) {
  const result = await urqlServer().mutation(DeleteSectorDocument, {
    id: sectorId,
  });
  if (result.error) {
    console.error(result.error);
    throw new Error("Pri brisanju sektorja je prišlo do napake.");
  }

  return result.data.deleteSector;
}

export default deleteSectorAction;

gql`
  mutation DeleteSector($id: String!) {
    deleteSector(id: $id)
  }
`;

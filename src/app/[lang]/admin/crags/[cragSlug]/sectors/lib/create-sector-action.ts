"use server";

import { gql } from "graphql-request";
import { gqlRequest } from "@/lib/gql-request";
import { CreateSectorDocument, CreateSectorInput } from "@/graphql/generated";
import { revalidatePath } from "next/cache";

async function createSectorAction(sectorData: CreateSectorInput) {
  const result = await gqlRequest(CreateSectorDocument, { input: sectorData });
  if (result.error) {
    console.error(result.error);
    throw new Error("Pri shranjevanju sektorja je prišlo do napake.");
  }

  revalidatePath("admin/crags/[cragSlug]/sectors", "page");
  return result.data.createSector;
}

export default createSectorAction;

gql`
  mutation CreateSector($input: CreateSectorInput!) {
    createSector(input: $input) {
      id
    }
  }
`;

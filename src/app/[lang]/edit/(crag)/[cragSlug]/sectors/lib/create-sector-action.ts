"use server";

import { gqlRequest } from "@/lib/graphql-client";
import { CreateSectorDocument, CreateSectorInput } from "@/graphql/generated";

async function createSectorAction(sectorData: CreateSectorInput) {
  try {
    const result = await gqlRequest(CreateSectorDocument, {
      input: sectorData,
    });
    return { success: true, data: result.createSector };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Pri shranjevanju sektorja je prišlo do napake.",
    };
  }
}

export default createSectorAction;

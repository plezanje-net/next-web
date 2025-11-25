"use server";

import { gqlRequest } from "@/lib/graphql-client";
import { UpdateSectorDocument, UpdateSectorInput } from "@/graphql/generated";

async function updateSectorAction(sectorData: UpdateSectorInput) {
  try {
    const result = await gqlRequest(UpdateSectorDocument, {
      input: sectorData,
    });
    return { success: true, data: result.updateSector };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Pri posodabljanju sektorja je prišlo do napake.",
    };
  }
}

export default updateSectorAction;

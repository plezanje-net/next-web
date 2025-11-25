"use server";

import { gqlRequest } from "@/lib/graphql-client";
import { DeleteSectorDocument } from "@/graphql/generated";

async function deleteSectorAction(sectorId: string) {
  try {
    const result = await gqlRequest(DeleteSectorDocument, {
      id: sectorId,
    });
    return { success: true, data: result.deleteSector };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Pri brisanju sektorja je prišlo do napake.",
    };
  }
}

export default deleteSectorAction;

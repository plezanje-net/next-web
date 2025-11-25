"use server";

import { gqlRequest } from "@/lib/graphql-client";
import { UpdateCragDocument, UpdateCragInput } from "@/graphql/generated";

async function updateCragAction(cragData: UpdateCragInput) {
  try {
    const result = await gqlRequest(UpdateCragDocument, {
      input: cragData,
    });
    return { success: true, data: result.updateCrag };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Pri shranjevanju plezališča je prišlo do napake." };
  }
}

export default updateCragAction;

"use server";

import { gqlRequest } from "@/lib/graphql-client";
import { CreateCragDocument, CreateCragInput } from "@/graphql/generated";

async function createCragAction(cragData: CreateCragInput) {
  try {
    const result = await gqlRequest(CreateCragDocument, {
      input: cragData,
    });
    return { success: true, data: result.createCrag };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Pri shranjevanju plezališča je prišlo do napake.",
    };
  }
}

export default createCragAction;

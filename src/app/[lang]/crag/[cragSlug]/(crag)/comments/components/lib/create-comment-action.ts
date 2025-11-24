"use server";

import { CreateCommentDocument } from "@/graphql/generated";
import { gqlRequest } from "@/lib/graphql-client";

async function createCommentAction(formData: FormData) {
  try {
    await gqlRequest(CreateCommentDocument, {
      input: {
        cragId: formData.get("cragId") as string,
        content: formData.get("commentContent") as string,
        type: formData.get("commentType") as string,
      },
    });
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: "Pri objavi komentarja je prišlo do napake.",
    };
  }
}

export default createCommentAction;

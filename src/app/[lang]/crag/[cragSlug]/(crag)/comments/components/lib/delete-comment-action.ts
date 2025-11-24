"use server";

import { DeleteCommentDocument } from "@/graphql/generated";
import { gqlRequest } from "@/lib/graphql-client";

async function deleteCommentAction(commentId: string) {
  try {
    await gqlRequest(DeleteCommentDocument, {
      id: commentId,
    });
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: "Pri brisanju komentarja je prišlo do napake.",
    };
  }
}

export default deleteCommentAction;

"use server";

import { UpdateCommentDocument } from "@/graphql/generated";
import { CommentType } from "../comment";
import { gqlRequest } from "@/lib/graphql-client";

async function updateCommentAction(
  commentId: string,
  commentContent: string,
  commentType: CommentType
) {
  try {
    await gqlRequest(UpdateCommentDocument, {
      input: {
        id: commentId,
        content: commentContent,
        // type: commentType,// TODO: BE should allow to change the comment type on update
      },
    });
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: "Pri shranjevanju komentarja je prišlo do napake.",
    };
  }
}

export default updateCommentAction;

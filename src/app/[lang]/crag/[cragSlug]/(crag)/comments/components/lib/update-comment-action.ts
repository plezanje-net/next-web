"use server";

import { UpdateCommentDocument } from "@/graphql/generated";
import { CommentType } from "../comment";
import { gqlRequest } from "@/lib/gql-request";
import { gql } from "graphql-request";

async function updateCommentAction(
  commentId: string,
  commentContent: string,
  commentType: CommentType
) {
  const result = await gqlRequest(UpdateCommentDocument, {
    input: {
      id: commentId,
      content: commentContent,
      // type: commentType,// TODO: BE should allow to change the comment type on update
    },
  });

  if (result.error) {
    throw new Error("Pri shranjevanju komentarja je prišlo do napake.");
  }

  return true;
}

export default updateCommentAction;

gql`
  mutation UpdateComment($input: UpdateCommentInput!) {
    updateComment(input: $input) {
      id
      content
    }
  }
`;

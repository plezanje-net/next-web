"use server";

import { DeleteCommentDocument } from "@/graphql/generated";
import { gqlRequest } from "@/lib/gql-request";
import { gql } from "graphql-request";

async function deleteCommentAction(commentId: string) {
  const result = await gqlRequest(DeleteCommentDocument, {
    id: commentId,
  });

  if (result.error) {
    throw new Error("Pri brisanju komentarja je prišlo do napake.");
  }

  return true;
}

export default deleteCommentAction;

gql`
  mutation DeleteComment($id: String!) {
    deleteComment(id: $id)
  }
`;

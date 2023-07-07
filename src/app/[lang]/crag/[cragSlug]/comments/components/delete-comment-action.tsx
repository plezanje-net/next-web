"use server";

import { gql } from "urql/core";
import { DeleteCommentDocument } from "../../../../../../graphql/generated";
import urqlServer from "../../../../../../graphql/urql-server";

export async function deleteComment(commentId: string) {
  const result = await urqlServer().mutation(DeleteCommentDocument, {
    id: commentId,
  });

  if (result.error) {
    throw new Error("Pri brisanju komentarja je prišlo do napake.");
  }
  return true;
}

gql`
  mutation DeleteComment($id: String!) {
    deleteComment(id: $id)
  }
`;

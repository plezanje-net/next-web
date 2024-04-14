"use server";

import { gql } from "urql/core";
import { UpdateCommentDocument } from "../../../../../../../../graphql/generated";
import urqlServer from "../../../../../../../../graphql/urql-server";
import { CommentType } from "../comment";

async function updateCommentAction(
  commentId: string,
  commentContent: string,
  commentType: CommentType
) {
  const result = await urqlServer().mutation(UpdateCommentDocument, {
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

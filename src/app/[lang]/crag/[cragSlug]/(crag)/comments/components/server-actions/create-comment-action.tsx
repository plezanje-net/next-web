"use server";

import { gql } from "urql/core";
import { CreateCommentDocument } from "../../../../../../../../graphql/generated";
import urqlServer from "../../../../../../../../graphql/urql-server";

async function createCommentAction(formData: FormData) {
  const result = await urqlServer().mutation(CreateCommentDocument, {
    input: {
      cragId: formData.get("cragId"),
      content: formData.get("commentContent"),
      type: formData.get("commentType"),
    },
  });

  if (result.error) {
    throw new Error("Pri objavi komentarja je prišlo do napake.");
  }

  return true;
}

export default createCommentAction;

gql`
  mutation CreateComment($input: CreateCommentInput!) {
    createComment(input: $input) {
      id
    }
  }
`;

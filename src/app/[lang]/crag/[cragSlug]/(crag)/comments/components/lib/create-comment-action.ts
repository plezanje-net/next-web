"use server";

import { CreateCommentDocument } from "@/graphql/generated";
import { gqlRequest } from "@/lib/gql-request";
import { gql } from "graphql-request";

async function createCommentAction(formData: FormData) {
  const result = await gqlRequest(CreateCommentDocument, {
    input: {
      cragId: formData.get("cragId") as string,
      content: formData.get("commentContent") as string,
      type: formData.get("commentType") as string,
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

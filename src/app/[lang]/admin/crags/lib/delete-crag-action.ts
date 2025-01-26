"use server";

import { gql } from "urql/core";
import urqlServer from "@/graphql/urql-server";
import { DeleteCragDocument } from "@/graphql/generated";
import { revalidatePath } from "next/cache";

async function deleteCragAction(cragId: string) {
  const result = await urqlServer().mutation(DeleteCragDocument, {
    id: cragId,
  });

  // TODO: check for known errors. one of them being: crag_has_log_entries. display error how?

  if (result.error) {
    console.error(result.error);
    throw new Error("Pri brisanju plezališča je prišlo do napake.");
  }

  revalidatePath("crags", "page");
  return result.data.deleteCrag;
}

export default deleteCragAction;

gql`
  mutation DeleteCrag($id: String!) {
    deleteCrag(id: $id)
  }
`;

"use server";

import { gql } from "graphql-request";
import { gqlRequest } from "@/lib/gql-request";
import { ActivateAccountDocument } from "@/graphql/generated";

type TActivateAccountActionArgs = {
  id: string;
  token: string;
};

async function activateAccountAction({
  id,
  token,
}: TActivateAccountActionArgs) {
  const result = await gqlRequest(ActivateAccountDocument, {
    input: { id, token },
  });

  // TODO: generalize error handling
  if (result.error) {
    return { success: false, error: "unknown_error" };
  } else {
    return { success: true };
  }
}

export default activateAccountAction;

gql`
  mutation ActivateAccount($input: ConfirmInput!) {
    confirm(input: $input)
  }
`;

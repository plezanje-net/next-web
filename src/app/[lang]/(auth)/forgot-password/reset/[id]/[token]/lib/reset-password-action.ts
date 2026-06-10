"use server";

import { gql } from "graphql-request";
import { gqlRequest } from "@/lib/gql-request";
import { ResetPasswordDocument } from "@/graphql/generated";

type TResetPasswordActionArgs = {
  password: string;
  id: string;
  token: string;
};

async function resetPasswordAction({
  password,
  id,
  token,
}: TResetPasswordActionArgs) {
  const result = await gqlRequest(ResetPasswordDocument, {
    input: { id, token, password },
  });

  // TODO: generalize error handling
  if (result.error) {
    return { success: false, error: "unknown_error" };
  } else {
    return { success: true };
  }
}

export default resetPasswordAction;

gql`
  mutation ResetPassword($input: PasswordInput!) {
    setPassword(input: $input)
  }
`;

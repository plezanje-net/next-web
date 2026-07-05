"use server";

import { gql } from "graphql-request";
import { gqlRequest } from "@/lib/gql-request";
import { ForgotPasswordDocument } from "@/graphql/generated";

type TForgotPasswordActionArgs = {
  email: string;
  returnTo?: string;
};

async function forgotPasswordAction({
  email,
  returnTo,
}: TForgotPasswordActionArgs) {
  // TODO: extend api so returnTo can be included in recovery link, so after reset user gets back to where he was trying to go?

  const result = await gqlRequest(ForgotPasswordDocument, { email, returnTo });

  // TODO: generalize error handling
  if (result.error) {
    if (result.error.networkError?.message.includes("entity_not_found")) {
      return { success: false, error: "account_not_found" };
    } else {
      return { success: false, error: "unknown_error" };
    }
  } else {
    return { success: true };
  }
}

export default forgotPasswordAction;

gql`
  mutation ForgotPassword($email: String!, $returnTo: String) {
    recover(email: $email, returnTo: $returnTo)
  }
`;

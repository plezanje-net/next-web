"use server";

import { gql } from "graphql-request";
import { gqlRequest } from "@/lib/gql-request";
import { RegisterDocument } from "@/graphql/generated";

type TRegisterActionArgs = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  gender: "F" | "M" | null;
  returnTo?: string;
};

async function registerAction({
  email,
  password,
  firstName,
  lastName,
  gender,
  returnTo,
}: TRegisterActionArgs) {
  const result = await gqlRequest(RegisterDocument, {
    input: {
      email,
      password,
      firstname: firstName,
      lastname: lastName,
      gender,
    },
  });

  // TODO: generalize error handling
  if (result.error) {
    if (result.error.networkError?.message.includes("duplicate_entity_field")) {
      return { success: false, error: "account_exists" };
    } else {
      return { success: false, error: "unknown_error" };
    }
  } else {
    return { success: true };
  }
}

export default registerAction;

gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input)
  }
`;

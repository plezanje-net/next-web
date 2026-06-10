"use server";

import { LoginDocument } from "@/graphql/generated";
import { cookies } from "next/headers";
import { gql } from "graphql-request";
import { gqlRequest } from "@/lib/gql-request";

type TLoginActionArgs = {
  email: string;
  password: string;
};

async function loginAction({ email, password }: TLoginActionArgs) {
  const result = await gqlRequest(LoginDocument, { email, password });

  if (!result?.data?.login?.token) {
    return false;
  }

  (await cookies()).set("token", result.data.login.token);

  return true;
}

export default loginAction;

gql`
  mutation Login($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      token
    }
  }
`;

"use server";

import { LoginDocument } from "@/graphql/generated";
import { cookies } from "next/headers";
import { gql } from "graphql-request";
import { gqlRequest } from "@/lib/gql-request";

interface FormData {
  email: string;
  password: string;
}

async function loginAction(formData: FormData) {
  const { data } = await gqlRequest(LoginDocument, formData);
  return !!(data != null && (await cookies()).set("token", data.login.token));
}

export default loginAction;

gql`
  mutation Login($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      token
      user {
        id
        email
        fullName
        firstname
        lastname
        gender
        roles
      }
    }
  }
`;

"use server";

import { gql } from "@urql/core";
import urqlServer from "../../../../graphql/urql-server";
import { LoginDocument } from "../../../../graphql/generated";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

interface FormData {
  email: string;
  password: string;
}

async function loginAction(formData: FormData) {
  const { data } = await urqlServer().mutation(LoginDocument, formData);
  return !!(data != null && cookies().set("token", data.login.token));
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

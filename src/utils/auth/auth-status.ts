import { gql } from "@urql/core";
import { ProfileDocument, User } from "@/graphql/generated";
import getAuthToken from "./auth-token";
import urqlServer from "@/graphql/urql-server";

export type AuthStatus = {
  loggedIn: boolean;
  token?: string;
  user?: User;
};

async function authStatus(): Promise<AuthStatus> {
  const token = getAuthToken();
  const { data } = await urqlServer().query(ProfileDocument);

  if (token && data) {
    return {
      loggedIn: true,
      token,
      user: data.profile,
    };
  }
  return {
    loggedIn: false,
    token: "",
    user: undefined,
  };
}

export default authStatus;

gql`
  query Profile {
    profile {
      id
      firstname
      lastname
      fullName
      email
      roles
      gender
    }
  }
`;

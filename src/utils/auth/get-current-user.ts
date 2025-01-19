import { gql } from "urql/core";
import urqlServer from "@/graphql/urql-server";
import { AuthContextProfileDocument } from "@/graphql/generated";
import getAuthToken from "./auth-token";

async function getCurrentUser() {
  // If there is no token, we already know that user is not authenticated and we can return early
  const authToken = getAuthToken();
  if (!authToken) {
    return null;
  }

  const result = await urqlServer().query(AuthContextProfileDocument);

  if (result.error) {
    throw new Error(
      "Prišlo je do napake pri pridobivanju uporabnikovih podatkov."
    );
  }

  return result.data.profile;
}

export default getCurrentUser;

gql`
  query AuthContextProfile {
    profile {
      id
      firstname
      lastname
      fullName
      email
      roles
    }
  }
`;

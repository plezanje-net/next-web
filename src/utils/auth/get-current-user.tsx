import { gql } from "urql/core";
import urqlServer from "@/graphql/urql-server";
import { AuthContextProfileDocument } from "@/graphql/generated";

async function getCurrentUser() {
  const result = await urqlServer().query(AuthContextProfileDocument);

  if (result.error) {
    if (
      result.error.graphQLErrors?.[0]?.extensions?.code === "UNAUTHENTICATED"
    ) {
      return null;
    }

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

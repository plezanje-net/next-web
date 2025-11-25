import { AuthContextProfileDocument } from "@/graphql/generated";
import getAuthToken from "./auth-token";
import { gqlRequest } from "../graphql-client";

async function getCurrentUser() {
  const authToken = await getAuthToken();
  if (!authToken) {
    return null;
  }

  // there could be a try catch here to clear the cookie if the request fails
  const result = await gqlRequest(AuthContextProfileDocument);
  if (!result?.profile) {
    return null;
  }
  return result.profile;
}

export default getCurrentUser;

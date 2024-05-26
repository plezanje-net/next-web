import { registerUrql } from "@urql/next/rsc";
import { cacheExchange, createClient, fetchExchange } from "@urql/core";
import { cookies } from "next/headers";
import getAuthToken from "@/utils/auth/auth-token";

const makeClient = () => {
  return createClient({
    url: `${process.env.NEXT_PUBLIC_API_URL}`,
    exchanges: [cacheExchange, fetchExchange],
    fetchOptions: () => {
      const token = getAuthToken();
      if (!token) return {};
      return {
        headers: {
          authorization: token ? `Bearer ${token}` : "",
        },
      };
    },
  });
};

const { getClient } = registerUrql(makeClient);
const urqlServer = getClient;

export default urqlServer;

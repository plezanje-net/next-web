import { Client, cacheExchange, createClient, fetchExchange } from "@urql/core";

function urqlClient(token: string): Client {
  const client = createClient({
    url: `${process.env.NEXT_PUBLIC_API_URL}`,
    exchanges: [cacheExchange, fetchExchange],
    suspense: true,
    fetchOptions: () => {
      if (!token) return {};
      return {
        headers: {
          authorization: token ? `Bearer ${token}` : "",
        },
      };
    },
  });

  return client;
}

export default urqlClient;

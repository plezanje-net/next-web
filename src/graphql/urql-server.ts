import { registerUrql } from "@urql/next/rsc";
import { cacheExchange, createClient, fetchExchange } from "@urql/core";

const makeClient = () => {
  return createClient({
    url: `${process.env.NEXT_PUBLIC_API_URL}`,
    exchanges: [cacheExchange, fetchExchange],
  });
};

const { getClient } = registerUrql(makeClient);
const urqlServer = getClient;

export default urqlServer;

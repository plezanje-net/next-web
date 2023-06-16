import {
  Client,
  SSRExchange,
  cacheExchange,
  createClient,
  fetchExchange,
  ssrExchange,
} from "@urql/core";

interface UrqlClient {
  client: Client;
  ssr: SSRExchange;
}

const ssr = ssrExchange();
const client = createClient({
  url: `${process.env.NEXT_PUBLIC_API_URL}`,
  exchanges: [cacheExchange, ssr, fetchExchange],
  suspense: true,
});

const urqlClient: UrqlClient = {
  client,
  ssr,
};

export default urqlClient;

import "../styles/globals.css";
import type { AppProps } from "next/app";
import { dedupExchange, fetchExchange } from "urql";
import { withUrqlClient } from "next-urql";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default withUrqlClient(
  (ssrExchange, ctx) => {
    return {
      url: "https://plezanje.info/graphql",
      exchanges: [dedupExchange, ssrExchange, fetchExchange],
    };
  },
  { ssr: true }
)(MyApp);

import "../styles/globals.css";
import type { AppContext, AppProps } from "next/app";
import Head from "next/head";
import { cacheExchange, dedupExchange, fetchExchange } from "urql";
import { withUrqlClient } from "next-urql";
import { AuthProvider } from "../utils/providers/auth-provider";
import App from "next/app";
import cookies from "next-cookies";
import { NextPageContext } from "next";
import Layout from "../components/layout/layout";
interface MyAppProps extends AppProps {
  authToken: string;
}

function MyApp({ Component, pageProps, authToken }: MyAppProps) {
  return (
    <>
      <AuthProvider token={authToken}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </>
  );
}

export default withUrqlClient(
  (ssrExchange, ctx) => {
    const { token } = cookies(ctx ?? {});
    return {
      url: `${process.env.NEXT_PUBLIC_API_URL}`,
      fetchOptions: {
        headers: {
          authorization: token ? `Bearer ${token}` : "",
        },
      },
      exchanges: [dedupExchange, cacheExchange, ssrExchange, fetchExchange],
    };
  },
  { ssr: true }
)(MyApp);

MyApp.getInitialProps = async (context: AppContext | NextPageContext) => {
  if ("router" in context) {
    const appProps = await App.getInitialProps(context);
    const { token } = cookies(context.ctx);
    return { ...appProps, authToken: token ?? "" };
  }
};

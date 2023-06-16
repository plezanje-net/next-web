"use client";

import { UrqlProvider } from "@urql/next";
import urqlClient from "../graphql/urql-client";
import { SSRProvider } from "react-aria";

function Client({ children }: { children: React.ReactNode }) {
  return (
    <SSRProvider>
      <UrqlProvider client={urqlClient.client} ssr={urqlClient.ssr}>
        {children}
      </UrqlProvider>
    </SSRProvider>
  );
}

export default Client;

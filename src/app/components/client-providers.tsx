"use client";

import { SSRProvider } from "react-aria";
interface Props {
  children: React.ReactNode;
}

function ClientProviders({ children }: Props) {
  return <SSRProvider>{children}</SSRProvider>;
}

export default ClientProviders;

import "../styles/globals.css";
import Head from "next/head";
import Header from "../components/layout/header";
import { Poppins } from "next/font/google";
import authStatus from "../utils/auth/auth-status";
import ClientProviders from "./components/client-providers";

const poppins = Poppins({
  weight: ["400", "500"],
  subsets: ["latin-ext"],
  display: "swap",
});

interface Props {
  children: React.ReactNode;
}

async function RootLayout({ children }: Props) {
  return (
    <html>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="apple-mobile-web-app-title" content="Plezanje.net" />
        <meta name="application-name" content="Plezanje.net" />
        <meta name="msapplication-TileColor" content="#ffc40d" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <body className={`text-neutral-900 ${poppins.className}`}>
        <ClientProviders>
          <Header authStatus={await authStatus()} />
          <main>{children}</main>
        </ClientProviders>
      </body>
    </html>
  );
}

export default RootLayout;

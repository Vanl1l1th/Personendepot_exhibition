import Head from "next/head";
import { Container } from "semantic-ui-react";

import Header from "./Header";

function Layout({ children,user,thekey, products}) {
  return (
    <>

      <Head>
        <meta charSet="utf-8" />
        <link rel="stylesheet" type="text/css" href="/static/styles.css" />
        <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
        <link
          rel="stylesheet"
          href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.2/semantic.min.css"
        />
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="/static/myScript.js"></script>
        <title>Personendepot</title>
      </Head>

      <Header user={user} thekey={thekey} products={products} />

        {children}

    </>
  );
}

export default Layout;

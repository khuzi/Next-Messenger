import React from "react";
import Head from "next/head";

import { Layout, Chat, PrivateRoute } from "../components";

export default function Home() {
  return (
    <PrivateRoute>
      <Layout>
        <Head>
          <title>Next Messenger</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Chat />
      </Layout>
    </PrivateRoute>
  );
}

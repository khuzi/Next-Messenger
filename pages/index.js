import React, { useEffect } from "react";
import Router from "next/router";
import Head from "next/head";
import { useDispatch } from "react-redux";

import { isLoggedInUser } from "../redux/actions";
import { Layout } from "../components";

export default function Home() {
  const dispatch = useDispatch();
  if (typeof window === "undefined") {
    return "Loading...";
  }

  const isUser =
    typeof window !== "undefined" && localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;

  if (!isUser) {
    Router.push("/login");
    return null;
  } else {
    useEffect(() => {
      dispatch(isLoggedInUser());
    }, []);

    return (
      <Layout>
        <Head>
          <title>Next Messenger</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        hello
      </Layout>
    );
  }
}

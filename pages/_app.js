import React, { useEffect } from "react";
import Head from "next/head";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { useStore } from "../redux/store";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider, StylesProvider } from "@material-ui/core/styles";
import firebaseClient from "../firebase";
import { useDispatch } from "react-redux";

import { theme } from "../theme";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  firebaseClient();
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  const store = useStore(pageProps.initialReduxState);

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
      </Head>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <StylesProvider injectFirst>
            <CssBaseline />
            <Component {...pageProps} />
          </StylesProvider>
        </ThemeProvider>
      </Provider>
    </>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp;

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider, StylesProvider } from "@material-ui/core/styles";

import { theme } from "../theme";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <StylesProvider injectFirst>
        <CssBaseline />
        <Component {...pageProps} />
      </StylesProvider>
    </ThemeProvider>
  );
}
MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp;

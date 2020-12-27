import React from "react";

import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    background: theme.palette.primary.main,
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "1rem",
    padding: "1.5rem 0",
  },
}));

export function Footer() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="body2">
        {"Copyright © "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </div>
  );
}

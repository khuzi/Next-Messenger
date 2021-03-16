import React from "react";
import { Grid } from "@material-ui/core";

import { MessageBox } from "./messageBox";

export function ChatWindow() {
  return (
    <Grid item xs={9} style={{ padding: "1rem" }}>
      <MessageBox />
      <MessageBox right />
    </Grid>
  );
}

import React from "react";
import { Grid } from "@material-ui/core";

import { MessageBox } from "./messageBox";

export function ChatWindow() {
  return (
    <div style={{ padding: "1rem" }}>
      <MessageBox />
      <MessageBox right />
    </div>
  );
}

import React from "react";
import { Grid, Typography } from "@material-ui/core";

import { MessageBox } from "./messageBox";

import styles from "./chatWindow.module.css";

export function ChatWindow({ chatHolderName }) {
  return (
    <Grid item xs={9} className={styles.chat_window}>
      <div className={styles.chat_header}>
        <Typography variant="body1">{chatHolderName}</Typography>
      </div>
      <MessageBox />
      <MessageBox right />
    </Grid>
  );
}

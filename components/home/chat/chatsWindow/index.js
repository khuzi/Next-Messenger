import React from "react";
import { Grid } from "@material-ui/core";

import { ChatInstance } from "./chatInstance";

import styles from "./chatsWindow.module.css";

export function ChatsWindow() {
  return (
    <Grid item xs={3} className={styles.chats_window}>
      <ChatInstance />
      <ChatInstance />
    </Grid>
  );
}

import React from "react";
import { Grid } from "@material-ui/core";

import { ChatsWindow } from "./chatsWindow";
import { ChatWindow } from "./chatWindow";

import styles from "./chat.module.css";

export function Chat() {
  return (
    <Grid container className={styles.chat}>
      <ChatsWindow />
      <ChatWindow />
    </Grid>
  );
}

import React, { useState } from "react";
import { Grid } from "@material-ui/core";

import { ChatsWindow } from "./chatsWindow";
import { ChatWindow } from "./chatWindow";

import styles from "./chat.module.css";

export function Chat() {
  const [chatUser, setChatUser] = useState();
  return (
    <Grid container className={styles.chat}>
      <ChatsWindow onSetChatUser={setChatUser} />
      <ChatWindow chatHolderName={chatUser} />
    </Grid>
  );
}

import React, { useState } from "react";
import { Button, Grid, Typography, TextField } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";

import { MessageBox } from "./messageBox";
import { updateMessage } from "../../../../redux/actions";

import styles from "./chatWindow.module.css";

export function ChatWindow() {
  const { chatUserName, chatStarted, chatUserUid, loginUserUid } = useSelector(
    (state) => state.chat
  );
  const { conversation } = useSelector((state) => state.chat);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const submitMessage = (e) => {
    const msgObj = {
      chatUserUid: chatUserUid,
      loginUserUid: loginUserUid,
      message: message,
    };

    if (message !== "") {
      dispatch(updateMessage(msgObj)).then(() => {
        setMessage("");
      });
    }
  };

  return (
    <Grid
      container
      item
      xs={9}
      direction="column"
      justify="space-between"
      className={styles.chat_window}
    >
      {chatStarted && (
        <>
          <Grid item>
            <div className={styles.chat_header}>
              <Typography variant="body1">{chatUserName}</Typography>
            </div>
            {conversation?.map((msg, i) => (
              <MessageBox
                key={i}
                msg={msg.message}
                left={chatUserUid === msg.chatUserUid}
              />
            ))}
          </Grid>
          <Grid
            container
            item
            alignItems="center"
            justify="space-around"
            className={styles.input_wrapper}
          >
            <Grid item xs={10} className={styles.msg_input}>
              <TextField
                placeholder="Wrire a message.."
                multiline
                variant="outlined"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </Grid>
            <Grid item xs={1}>
              <Button onClick={submitMessage} className={styles.btn}>
                Send
              </Button>
            </Grid>
          </Grid>
        </>
      )}
    </Grid>
  );
}

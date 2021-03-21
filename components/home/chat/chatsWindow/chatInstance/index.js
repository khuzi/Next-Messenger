import React from "react";
import { Grid, Avatar, Typography } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useDispatch, useSelector } from "react-redux";

import { chatInit } from "../../../../../redux/actions";

import styles from "./chatInstance.module.css";

export function ChatInstance({ name, online, chatUserUid }) {
  const loginUser = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onChatInit = () => {
    dispatch(
      chatInit({
        chatUserName: name,
        chatUserUid: chatUserUid,
        loginUserUid: loginUser.uid,
      })
    );
  };
  return (
    <Grid
      container
      alignItems="center"
      className={styles.instance}
      onClick={onChatInit}
    >
      <Grid item xs={1}>
        <Avatar>
          <AccountCircleIcon />
        </Avatar>
      </Grid>
      <Grid item xs={8} className={styles.instance_name}>
        <Typography variant="body1">{name}</Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography
          variant="caption"
          style={{
            color: online ? "green" : "red",
            fontWeight: "bold",
            letterSpacing: "0.1px",
          }}
        >
          {online ? "Online" : "Offline"}
        </Typography>
      </Grid>
    </Grid>
  );
}

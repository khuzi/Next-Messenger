import React from "react";
import { Grid, Avatar, Typography } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import styles from "./chatInstance.module.css";

export function ChatInstance({ name, online, onClickInstance }) {
  return (
    <Grid
      container
      alignItems="center"
      className={styles.instance}
      onClick={() => onClickInstance(name)}
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

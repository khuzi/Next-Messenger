import React from "react";
import { Grid, Avatar, Typography } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import styles from "./chatInstance.module.css";

export function ChatInstance() {
  return (
    <Grid container alignItems="center" className={styles.instance}>
      <Grid item xs={1}>
        <Avatar>
          <AccountCircleIcon />
        </Avatar>
      </Grid>
      <Grid item xs={8} className={styles.instance_name}>
        <Typography variant="body1">Khuzaima</Typography>
      </Grid>
    </Grid>
  );
}

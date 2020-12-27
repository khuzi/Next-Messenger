import React from "react";
import Link from "next/link";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    cursor: "pointer",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  lgn: {
    flexGrow: 2,
  },
  name: {
    flexGrow: 5,
  },
}));

export function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Link href="/">
            <Typography variant="h6" className={classes.title}>
              Next Messenger
            </Typography>
          </Link>
          <div className={classes.lgn}>
            <Link href="/login">
              <Button color="inherit">Login</Button>
            </Link>
            <Link href="/signup">
              <Button color="inherit">Sign Up</Button>
            </Link>
          </div>
          <div className={classes.name}>
            <Typography variant="subtitle1">Hi, Khuzaima</Typography>
          </div>
          <Button color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

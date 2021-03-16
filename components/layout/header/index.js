import React from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { logout } from "../../../redux/actions";

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
  const { firstName, lastName, authenticated, uid } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

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
            {!authenticated && (
              <>
                <Link href="/login">
                  <Button color="inherit">Login</Button>
                </Link>
                <Link href="/signup">
                  <Button color="inherit">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
          <div className={classes.name}>
            <Typography
              variant="subtitle1"
              style={{ textTransform: "capitalize" }}
            >
              Hi, {`${firstName} ${lastName}`}
            </Typography>
          </div>
          <Button color="inherit" onClick={() => dispatch(logout(uid))}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

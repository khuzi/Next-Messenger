import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import { ChatInstance } from "./chatInstance";
import { getRealtimeUsers } from "../../../../redux/actions";

import styles from "./chatsWindow.module.css";

export function ChatsWindow() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  let unsubscribe;
  useEffect(() => {
    const currUser = JSON.parse(localStorage.getItem("user"));
    unsubscribe = dispatch(getRealtimeUsers(currUser.uid))
      .then((unsubscribe) => {
        return unsubscribe;
      })
      .catch((error) => {
        console.log(error);
      });
    return () => {
      //cleanup
      unsubscribe.then((f) => f()).catch((error) => console.log(error));
    };
  }, []);

  return (
    <Grid item xs={3} className={styles.chats_window}>
      {user.users?.map(({ uid, firstName, lastName, isOnline }) => (
        <ChatInstance
          key={uid}
          name={`${firstName} ${lastName}`}
          online={isOnline}
        />
      ))}
    </Grid>
  );
}

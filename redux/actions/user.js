import { userActionTypes } from "./actionTypes";
import firebase from "../../firebase";
const { firestore } = firebase;

const { GET_REALTIME_USERS } = userActionTypes;

export const getRealtimeUsersRequest = () => {
  return { type: `${GET_REALTIME_USERS}_REQUEST` };
};

export const getRealtimeUsersSuccess = (users) => {
  return {
    type: `${GET_REALTIME_USERS}_SUCCESS`,
    payload: { users },
  };
};

export const getRealtimeUsers = (uid) => {
  return async (dispatch) => {
    dispatch(getRealtimeUsersRequest());
    const db = firestore();
    const unsubscribe = db.collection("users").onSnapshot((querySnapshot) => {
      const users = [];
      querySnapshot.forEach((doc) => {
        if (doc.data().uid != uid) {
          users.push(doc.data());
        }
      });
      dispatch(getRealtimeUsersSuccess(users));
    });

    return unsubscribe;
  };
};

import firebase from "firebase/app";

import { authActionTypes } from "./actionTypes";

const {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
} = authActionTypes;

export const login = () => {
  return {
    type: USER_LOGIN_REQUEST,
  };
};

export const loginSuccess = (loggedInUser) => {
  return {
    type: USER_LOGIN_SUCCESS,
    payload: { user: loggedInUser },
  };
};

export const loginFailuare = (err) => {
  return { type: USER_LOGIN_FAILURE, payload: { err } };
};

export const signup = ({ firstName, lastName, email, password }) => {
  const { auth, firestore } = firebase;
  return (dispatch) => {
    const db = firestore();
    dispatch(login());
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((data) => {
        const currentUser = auth().currentUser;
        const name = `${firstName} ${lastName}`;
        currentUser
          .updateProfile({
            displayName: name,
          })
          .then(() => {
            db.collection("users").add({
              firstName: firstName,
              lastName: lastName,
              uid: data.user.uid,
              createdAt: new Date(),
            });
          })
          .then(() => {
            const loggedInUser = {
              firstName: firstName,
              lastName: lastName,
              uid: data.user.uid,
              email: email,
            };
            localStorage.setItem("user", JSON.stringify(loggedInUser));
            console.log("User registered");
            dispatch(loginSuccess(loggedInUser));
          });
      })
      .catch((err) => {
        console.log(err);
        dispatch(loginFailuare(err));
      });
  };
};

import Router from "next/router";
import firebase from "../../firebase";
const { auth, firestore } = firebase;

import { authActionTypes } from "./actionTypes";

const {
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAILURE,
} = authActionTypes;

export const signUpRequest = () => {
  return {
    type: USER_SIGNUP_REQUEST,
  };
};

export const signUpSuccess = (loggedInUser) => {
  return {
    type: USER_SIGNUP_SUCCESS,
    payload: { user: loggedInUser },
  };
};

export const signUpFailuare = (err) => {
  return { type: USER_SIGNUP_FAILURE, payload: { err } };
};

export const loginRequest = () => {
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

export const logoutRequest = () => {
  return { type: USER_LOGOUT_REQUEST };
};

export const logoutSuccess = () => {
  return { type: USER_LOGOUT_SUCCESS };
};

export const logoutFailure = (err) => {
  return { type: USER_LOGOUT_FAILURE, payload: { err } };
};

export const signup = ({ firstName, lastName, email, password }) => {
  return (dispatch) => {
    const db = firestore();
    dispatch(signUpRequest());
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
            db.collection("users").doc(data.user.uid).set({
              firstName: firstName,
              lastName: lastName,
              uid: data.user.uid,
              createdAt: new Date(),
              isOnline: true,
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
            console.log("User registered successfully....!");
            dispatch(signUpSuccess(loggedInUser));
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        dispatch(signUpFailuare(err));
      });
  };
};

export const signin = (user) => {
  return async (dispatch) => {
    dispatch(loginRequest());
    auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then((data) => {
        const db = firestore();
        db.collection("users")
          .doc(data.user.uid)
          .update({
            isOnline: true,
          })
          .then(() => {
            const name = data.user.displayName.split(" ");
            const firstName = name[0];
            const lastName = name[1];
            const loggedInUser = {
              firstName,
              lastName,
              uid: data.user.uid,
              email: data.user.email,
            };
            localStorage.setItem("user", JSON.stringify(loggedInUser));
            dispatch(loginSuccess(loggedInUser));
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        dispatch(loginFailuare(err));
      });
  };
};

export const isLoggedInUser = () => {
  return async (dispatch) => {
    const user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;

    if (user) {
      dispatch(loginSuccess(user));
    } else {
      dispatch(loginFailuare("Login again please."));
    }
  };
};

export const logout = (uid) => {
  return async (dispatch) => {
    dispatch(logoutRequest());
    const db = firestore();
    db.collection("users")
      .doc(uid)
      .update({
        isOnline: false,
      })
      .then(() => {
        auth()
          .signOut()
          .then(() => {
            dispatch(logoutSuccess());
            localStorage.clear();
            Router.push("/login");
          })
          .catch((err) => {
            dispatch(loginFailuare(err));
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

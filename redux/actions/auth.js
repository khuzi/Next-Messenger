import Router from "next/router";
import firebase from "firebase/app";
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
  Router.push("/");
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
  Router.push("/");
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
            console.log("User registered successfully....!");
            dispatch(signUpSuccess(loggedInUser));
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

export const logout = () => {
  return async (dispatch) => {
    dispatch(logoutRequest());
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
  };
};

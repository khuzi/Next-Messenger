import firebase from "../../firebase";
const { firestore } = firebase;

import { chatActionTypes } from "./actionTypes";

const { GET_CHAT_BASICDATA, GET_REALTIME_MESSAGES } = chatActionTypes;

export const getbasicData = (basicData) => {
  return { type: GET_CHAT_BASICDATA, payload: { basicData } };
};

export const getRealTimeConversation = (conversation) => {
  return {
    type: GET_REALTIME_MESSAGES,
    payload: { conversation },
  };
};

export const chatInit = (basicData) => {
  return async (dispatch) => {
    dispatch(getbasicData(basicData));
    const db = firestore();
    db.collection("conversations")
      .where("loginUserUid", "in", [
        basicData.loginUserUid,
        basicData.chatUserUid,
      ])
      .orderBy("createdAt", "asc")
      .onSnapshot((querySnapshot) => {
        const conversations = [];

        querySnapshot.forEach((doc) => {
          if (
            (doc.data().loginUserUid == basicData.loginUserUid &&
              doc.data().chatUserUid == basicData.chatUserUid) ||
            (doc.data().loginUserUid == basicData.chatUserUid &&
              doc.data().chatUserUid == basicData.loginUserUid)
          ) {
            conversations.push(doc.data());
          }
        });
        dispatch(getRealTimeConversation(conversations));
        console.log(conversations);
      });
  };
};

export const updateMessage = (msgObj) => {
  return async (dispatch) => {
    const db = firestore();
    db.collection("conversations")
      .add({
        ...msgObj,
        isView: false,
        createdAt: new Date(),
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

import { chatActionTypes } from "../actions/actionTypes";

const { GET_CHAT_BASICDATA, GET_REALTIME_MESSAGES } = chatActionTypes;

const initialState = {
  chatStarted: false,
  chatUserName: "",
  chatUserUid: "",
  loginUserUid: "",
  conversation: [],
};

export const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CHAT_BASICDATA:
      return {
        ...state,
        chatStarted: true,
        ...action.payload.basicData,
      };
    case GET_REALTIME_MESSAGES:
      return {
        ...state,
        conversation: action.payload.conversation,
      };

    default:
      return state;
  }
};

import { combineReducers } from "redux";
import { authReducer } from "./auth";
import { userReducer } from "./user";
import { chatReducer } from "./chat";

export const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  chat: chatReducer,
});

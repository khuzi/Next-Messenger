import { combineReducers } from "redux";
import { authReducer } from "./auth";
import { userReducer } from "./user";

export const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
});

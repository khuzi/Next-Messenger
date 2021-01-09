import { authActionTypes } from "../actions/actionTypes";

const {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
} = authActionTypes;

const initialState = {
  uid: "",
  firstName: "",
  lastName: "",
  email: "",
  authenticating: false,
  authenticated: false,
  error: null,
};
export const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        authenticating: true,
      };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        ...payload.user,
        authenticated: true,
        authenticating: false,
      };
    case USER_LOGIN_FAILURE:
      return {
        ...state,
        authenticated: false,
        authenticating: false,
        error: payload.error.message,
      };
    default:
      return state;
  }
};

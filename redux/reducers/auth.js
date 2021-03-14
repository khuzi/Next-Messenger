import { authActionTypes } from "../actions/actionTypes";

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
    case USER_SIGNUP_REQUEST:
      return {
        ...state,
        authenticating: true,
      };
    case USER_SIGNUP_SUCCESS:
      return {
        ...state,
        ...payload.user,
        authenticated: true,
        authenticating: false,
      };
    case USER_SIGNUP_FAILURE:
      return {
        ...state,
        authenticated: false,
        authenticating: false,
        error: payload.err.message,
      };
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
        error: payload.err.message,
      };
    case USER_LOGOUT_REQUEST:
      return { ...state };
    case USER_LOGOUT_SUCCESS:
      return {
        ...initialState,
      };
    case USER_LOGOUT_FAILURE:
      return {
        ...state,
        error: payload.err.message,
      };
    default:
      return state;
  }
};

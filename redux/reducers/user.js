import { userActionTypes } from "../actions/actionTypes";

const { GET_REALTIME_USERS } = userActionTypes;

const intiState = {
  users: [],
};

export const userReducer = (state = intiState, action) => {
  switch (action.type) {
    case `${GET_REALTIME_USERS}_REQUEST`:
      return { ...intiState };
    case `${GET_REALTIME_USERS}_SUCCESS`:
      return {
        ...state,
        users: action.payload.users,
      };
    default:
      return state;
  }
};

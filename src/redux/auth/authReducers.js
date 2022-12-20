import { AUTH_FAILURE, AUTH_START, AUTH_SUCCESS, LOGOUT } from "./authTypes";

const INITIAL_STATE = {
  user: null,
  loading: false,
  error: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_START:
      return {
        ...state,
        loading: true,
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: null,
      };
    case AUTH_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LOGOUT:
      localStorage.clear();
      return {
        user: null,
        loading: false,
      };
    default:
      return state;
  }
};

export default authReducer;

import {
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  SIGNUP_START,
  SIGNUP_SUCCESS,
} from '../actions/actionTypes';

const initaialAuthState = {
  user: {},
  error: null,
  isLoggedIn: false,
  inProgress: false,
};

export default function auth(state = initaialAuthState, action) {
  switch (action.type) {
    case LOGIN_START:
    case SIGNUP_START:
      return {
        ...state,
        inProgress: true,
      };
    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
      return {
        ...state,
        user: action.user,
        inProgress: false,
        isLoggedIn: true,
        error: null,
      };
    case LOGIN_FAILED:
    case SIGNUP_FAILED:
      return {
        ...state,
        inProgress: false,
        isLoggedIn: false,
        error: action.error,
      };
    case AUTHENTICATE_USER:
      return {
        ...state,
        user: action.user,
        isLoggedIn: true,
      };
    case LOG_OUT:
      return {
        ...state,
        user: {},
        isLoggedIn: false,
      };
    default:
      return state;
  }
}

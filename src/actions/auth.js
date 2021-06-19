import { APIUrls } from '../helpers/urls';
import {
  LOGIN_FAILED,
  LOGIN_START,
  LOGIN_SUCCESS,
  SIGNUP_FAILED,
  SIGNUP_START,
  SIGNUP_SUCCESS,
  AUTHENTICATE_USER,
  LOG_OUT,
} from './actionTypes';
import { getFormBody } from '../helpers/utils';

//AUTHENTICATE ACTION CREATORS

export function authenticateUser(user) {
  return {
    type: AUTHENTICATE_USER,
    user,
  };
}

export function logoutUser() {
  return {
    type: LOG_OUT,
  };
}
//LOGIN ACTION CREATORS
export function startLogin() {
  return {
    type: LOGIN_START,
  };
}
export function loginFailed(errorMessage) {
  return {
    type: LOGIN_FAILED,
    error: errorMessage,
  };
}
export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user: user,
  };
}

export function login(email, password) {
  return function (dispatch) {
    dispatch(startLogin());
    const url = APIUrls.login();
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: getFormBody({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('data :: ', data);

        if (data.success) {
          dispatch(loginSuccess(data.data.user));
          return;
        }
        dispatch(loginFailed(data.message));
      });
  };
}

//SIGNUP ACTION CREATORS

export function signupSuccesful(user) {
  return {
    type: SIGNUP_SUCCESS,
    user,
  };
}

export function signupFailed(errorMessage) {
  return {
    type: SIGNUP_FAILED,
    error: errorMessage,
  };
}

export function signupStart() {
  return {
    type: SIGNUP_START,
  };
}

export function signUp(email, password, confirmPassword, name) {
  return (dispatch) => {
    const url = APIUrls.signUp();

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: getFormBody({ email, password, confirmPassword, name }),
    })
      .then((response) => {
        response.json();
      })
      .then((data) => {
        if (data.success) {
          localStorage.setItem('token', data.data.token);
          dispatch(signupSuccesful(data.data.user));
          return;
        }
        dispatch(signupFailed(data.message));
      });
  };
}

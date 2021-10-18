import { IS_LOGGED_IN, UPDATE_USER, LOGIN, LOGOUT } from './types';
import authApiRequest from '../services/authApiRequest';
import AuthState from '../enums/AuthState';

export const isLoggedIn = () => async (dispatch) => {
  const res = await authApiRequest({
    url: '/api/users/currentuser',
    extraHeaders: {
      Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
    },
  });
  // update auth state
  dispatch({
    type: IS_LOGGED_IN,
    payload: res.data.currentUser ? AuthState.LOGGED_IN : AuthState.LOGGED_OUT,
  });

  // update user state
  dispatch({
    type: UPDATE_USER,
    payload: res.data.currentUser,
  });
};

export const loggedIn = () => async (dispatch) => {
  // update auth state
  dispatch({ type: LOGIN, payload: AuthState.LOGGED_IN });
  const res = await authApiRequest({
    url: '/api/users/currentuser',
    extraHeaders: {
      Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
    },
  });
  // update user state
  dispatch({ type: UPDATE_USER, payload: res.data.currentUser });
};

export const loggedOut = () => async (dispatch) => {
  // update auth state
  dispatch({ type: LOGOUT, payload: AuthState.LOGGED_OUT });
  // update user state
  dispatch({ type: UPDATE_USER, payload: null });
};

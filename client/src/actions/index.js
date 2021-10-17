import { IS_LOGGED_IN, UPDATE_USER, LOGIN, LOGOUT } from './types';
import apiRequest from '../services/apiRequest';
import authApiRequest from '../services/authApiRequest';
import AuthState from '../enums/AuthState';

export const isLoggedIn = () => async (dispatch) => {
  const res = await authApiRequest({
    url: '/api/users/currentuser',
    extraHeaders: {
      Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
    },
  });
  console.log('IS_LOGGED_IN:', res);
  dispatch({
    type: IS_LOGGED_IN,
    payload: res.data.currentUser ? AuthState.LOGGED_IN : AuthState.LOGGED_OUT,
  });
};

export const updateUser = () => async (dispatch) => {
  const res = await authApiRequest({
    url: '/api/users/currentuser',
    extraHeaders: {
      Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
    },
  });
  dispatch({ type: UPDATE_USER, payload: res.data.currentUser });
};

export const loggedIn = () => async (dispatch) => {
  dispatch({ type: LOGIN, payload: AuthState.LOGGED_IN });
};

export const loggedOut = () => async (dispatch) => {
  console.log('LOGGED OUT action');
  dispatch({ type: LOGOUT, payload: AuthState.LOGGED_OUT });
};

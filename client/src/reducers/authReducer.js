import { IS_LOGGED_IN, LOGIN, LOGOUT } from '../actions/types';
import AuthState from '../enums/AuthState';

/* eslint-disable import/no-anonymous-default-export */
export default function (state = AuthState.UNKOWN, action) {
  switch (action.type) {
    case IS_LOGGED_IN:
      return action.payload || false;
    case LOGIN:
      return action.payload || false;
    case LOGOUT:
      return action.payload || false;
    default:
      return state;
  }
}

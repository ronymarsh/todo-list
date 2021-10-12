import { UPDATE_USER } from '../actions/types';

/* eslint-disable import/no-anonymous-default-export */
export default function (state = null, action) {
  switch (action.type) {
    case UPDATE_USER:
      return action.payload || false;
    default:
      return state;
  }
}

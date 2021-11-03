import { FETCH_TODOS } from '../actions/types';

/* eslint-disable import/no-anonymous-default-export */
export default function (state = [], action) {
  switch (action.type) {
    case FETCH_TODOS:
      return action.payload || false;
    default:
      return state;
  }
}

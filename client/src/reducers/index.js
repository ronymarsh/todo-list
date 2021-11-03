import { combineReducers } from 'redux';
import userReducer from './userReducer';
import authReducer from './authReducer';
import todosReducer from './todosReducer';

export default combineReducers({
  auth: authReducer,
  user: userReducer,
  todos: todosReducer,
});

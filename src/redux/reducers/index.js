import { combineReducers } from 'redux';
import userInfo from './UserInfo';
import token from './Token';

const rootReducer = combineReducers({ userInfo, token });

export default rootReducer;

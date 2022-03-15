import { combineReducers } from 'redux';
import player from './Player';
import token from './Token';

const rootReducer = combineReducers({ player, token });

export default rootReducer;

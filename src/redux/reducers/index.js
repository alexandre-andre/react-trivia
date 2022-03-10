import { combineReducers } from 'redux';

const INITIAL_STATE = {
  email: '',
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  token: {},
};

const exampleReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SEND_PLAYER_DATA':
    return {
      ...state,
      email: action.payload[0],
      name: action.payload[1],
    };
  case 'GET_SUCCESS':
    return { ...state, token: action.payload.token };
  default:
    return state;
  }
};

const rootReducer = combineReducers({ exampleReducer });

export default rootReducer;

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SEND_PLAYER_DATA':
    return {
      ...state,
      gravatarEmail: action.payload[0],
      name: action.payload[1],
      hash: action.payload[2],
    };
  case 'UPDATE_PLAYER_SCORE':
    return {
      ...state,
      score: action.payload[0],
      assertions: action.payload[1],
    };
  default:
    return state;
  }
};

export default player;

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const userInfo = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SEND_PLAYER_DATA':
    return {
      ...state,
      email: action.payload[0],
      name: action.payload[1],
      // gravatarEmail: '',
    };
  default:
    return state;
  }
};

export default userInfo;

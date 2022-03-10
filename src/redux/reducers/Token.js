const INITIAL_STATE = '';

const token = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'REQUEST_SUCCESS':
    return action.payload.token;
  default:
    return state;
  }
};

export default token;

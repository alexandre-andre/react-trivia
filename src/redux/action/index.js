import getTriviaToken from '../../service/TriviaAPI';

const SEND_PLAYER_DATA = 'SEND_PLAYER_DATA';

export const actionTypes = {
  SEND_PLAYER_DATA,
};

const requestBegin = () => ({ type: 'REQUEST' });
const requestSuccess = (obj) => ({ type: 'REQUEST_SUCCESS', payload: obj });
const requestError = (error) => ({ type: 'REQUEST_ERROR', payload: error });
const sendPlayerData = ([email, name]) => (
  { type: SEND_PLAYER_DATA, payload: [email, name] }
);

const requestAPI = () => async (dispatch) => {
  dispatch(requestBegin);
  try {
    const tokenObj = await getTriviaToken();
    localStorage.setItem('token', JSON.stringify(tokenObj.token));
    dispatch(requestSuccess(tokenObj));
  } catch (error) {
    dispatch(requestError(error.message));
  }
};

export const actionCreators = {
  sendPlayerData,
  requestAPI,
};

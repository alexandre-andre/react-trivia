import getTriviaToken from '../../service/TriviaAPI';

const SEND_PLAYER_DATA = 'SEND_PLAYER_DATA';
const ADD_TOKEN = 'ADD_TOKEN';

export const actionTypes = {
  SEND_PLAYER_DATA,
  ADD_TOKEN
};

const request = () => ({ type: 'REQUEST' });
const getSuccess = (obj) => ({ type: 'GET_SUCCESS', payload: obj });
const getError = (error) => ({ type: 'GET_ERROR', payload: error });
// const addToken = (obj) => ({ type: ADD_TOKEN, payload: obj });
const sendPlayerData = ([email, name]) => ({ type: SEND_PLAYER_DATA, payload: [email, name] });

const requestAPI = () => async(dispatch) => {
  dispatch(request);
  try {
    const tokenObj = await getTriviaToken();
    localStorage.setItem('token', JSON.stringify(tokenObj.token))
    dispatch(getSuccess(tokenObj));
  } catch(error) {
    dispatch(getError(error));
  }
}

export const actionCreators = {
  sendPlayerData,
  requestAPI,
};

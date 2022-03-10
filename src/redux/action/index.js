const SEND_PLAYER_DATA = 'SEND_PLAYER_DATA';
export const actionTypes = {
  SEND_PLAYER_DATA,
};

const sendPlayerData = (playerData) => ({ type: SEND_PLAYER_DATA, payload: playerData });
export const actionCreators = {
  sendPlayerData,
};

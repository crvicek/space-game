export const uuid = require('uuid/v4');

export const STEP_Y = 5;
export const STEP_X = 5;

export const SOCKET_POSITION_SYNC = '@clients/syncPositions';
export const SOCKET_PLAYER_KEYPRESS = '@server/emitKeypress';
export const SOCKET_OPPONENT_KEYPRESS = '@clients/emitKeypress';
export const SOCKET_GAME_ASSIGNED = '@clients/gameAssigned';
export const SOCKET_GAME_OVER = '@clients/gameOver';
export const SOCKET_GAME_STARTED = '@clients/gameStarted';

export const GAME_STATE = {
  started: 1,
  waiting: 0,
  ended: -1,
};

export const GAME_ACTION = {
  receiveInput: '@actions/RECEIVE_INPUT',
};

export const GAME_AREA = {
  width: 900,
  height: 600,
};
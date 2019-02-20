export const uuid = require('uuid/v4');

export const GAME_STATE = {
  started: 1,
  waiting: 0,
  ended: -1,
};

export const GAME_ACTION = {
  receiveInput: '@actions/RECEIVE_INPUT',
};

export const GAME_AREA = {
  width: 1200,
  height: 700,
};
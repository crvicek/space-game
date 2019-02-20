import { combineReducers } from 'redux';
import Game from '../entity/Game';

interface IServerState {
  games: Game[]
};

const InitServerState: IServerState = {
  games: []
};

function ServerState(state = InitServerState, action) {
  switch () {
    
  }
}

export default combineReducers([serverState]);
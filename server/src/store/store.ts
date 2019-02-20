import Game from '../entity/Game';

export interface IServerState {
  games: Game[]
}

export function ServerState(initialState: IServerState, action) {
  
}